using AutoMapper;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using FastBite.Data.Configs;
using FastBite.Data.Contexts;
using FastBite.Data.DTOS;
using FastBite.Data.Models;
using FastBite.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FastBite.Services.Classes;

public class ProductService : IProductService
{
    private readonly FastBiteContext _context;
    public Mapper mapper;
    private readonly IConfiguration _config;
     private readonly BlobServiceClient _blobServiceClient;
    private readonly BlobContainerClient _containerClient;

    public ProductService(FastBiteContext context, IConfiguration config)
    {
        _context = context;
        _config = config;
        mapper = MappingConfiguration.InitializeConfig();
        _blobServiceClient = new BlobServiceClient(_config["BlobConnection:ConnectionString"]);
        _containerClient = _blobServiceClient.GetBlobContainerClient(_config["BlobConnection:ContainerName"]);
    }

    public async Task<List<ProductDTO>> GetAllProductsAsync()
    {
        var res = await _context.Products.Include(p => p.Category).ToListAsync(); 
        return mapper.Map<List<ProductDTO>>(res);
    }

    public async Task<ProductDTO> AddNewProductAsync(ProductDTO productDto, CancellationToken cancellationToken)
    {
        BlobClient blobClient = _containerClient.GetBlobClient(productDto.ImageUrl); 

        try
        {
            var category = await _context.Categories.FirstOrDefaultAsync(c => c.Name == productDto.CategoryName);

            var product = new Product
            {
                Name = productDto.Name,
                Description = productDto.Description,
                Price = productDto.Price,
                CategoryId = category.Id,
                ImageUrl = productDto.ImageUrl
            };

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return mapper.Map<ProductDTO>(product);
        }
        catch (OperationCanceledException)
        {
            await blobClient.DeleteIfExistsAsync(cancellationToken: cancellationToken);
            throw new Exception("Operation was cancelled");
        }
    }

    public async Task<PostResponse> UploadImageAsync(IFormFile file, CancellationToken cancellationToken)
    {
        try
        {
            if (file == null || file.Length == 0)
            {
                return new PostResponse("No file uploaded", 400);
            }

            BlobClient blobClient = _containerClient.GetBlobClient(file.FileName);

            using var stream = file.OpenReadStream();

            var ops = new BlobUploadOptions
            {
                HttpHeaders = new BlobHttpHeaders
                {
                    ContentType = file.ContentType ?? "application/octet-stream"
                }
            };

            var uploadTask = blobClient.UploadAsync(stream, ops, cancellationToken);

            if (await Task.WhenAny(uploadTask, Task.Delay(TimeSpan.FromSeconds(15), cancellationToken)) == uploadTask)
            {
                await uploadTask; 
                return new PostResponse(blobClient.Uri.ToString(), 200);
            }
            else
            {   
                return new PostResponse("Request timed out", 408);
            }
        }
        catch (Exception e)
        {
            return new PostResponse($"Error uploading file: {e.Message}", 500);
        }
    }

    public async Task<PostResponse> DeleteProductAsync(Guid productId) {
        
        var product = _context.Products.FirstOrDefault(p => p.Id == productId);

        if (product == null)
        {
            return new PostResponse("Product Not Found", 404);
        }

        _context.Products.Remove(product);
        _context.SaveChanges();

        return new PostResponse("Product Deleted", 200);
    }
}