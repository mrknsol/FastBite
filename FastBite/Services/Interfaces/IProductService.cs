using FastBite.Data.DTOS;
using FastBite.Data.Models;

namespace FastBite.Services.Interfaces;

public interface IProductService {
    public Task<List<ProductDTO>> GetAllProductsAsync();
    public Task<ProductDTO> AddNewProductAsync(ProductDTO product, CancellationToken cancellationToken);
    public Task<PostResponse> UploadImageAsync(IFormFile file, CancellationToken cancellationToken);
    public Task<PostResponse> DeleteProductAsync(Guid productId);
}