using FastBite.Data.DTOS;
using FastBite.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FastBite.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
    private readonly IProductService _productService;

    public ProductController(IProductService productService)
    {
        _productService = productService;
    }

    [Authorize(Roles = "AppAdmin")]
    [HttpPost("Create")]
    public async Task<IActionResult> CreateProduct([FromForm] ProductDTO productDto, CancellationToken cancellationToken)
    {
        try
        {
            var createdProduct = await _productService.AddNewProductAsync(productDto, cancellationToken);
            return Ok(createdProduct);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"InternalServerError: {ex.Message}");
        }
    }

    [Authorize(Roles = "AppAdmin")]
    [HttpPost("Image/Add")]
    public async Task<IActionResult> UploadImageAsync(IFormFile file, CancellationToken cancellationToken)
    {
        var res = await _productService.UploadImageAsync(file, cancellationToken);
    
        return Ok(res);
    }

    [HttpGet("Get")]
    public async Task<IActionResult> GetAllProducts()
    {
        try
        {
            var products = await _productService.GetAllProductsAsync();
            return Ok(products);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"InternalServerError: {ex.Message}");
        }
    }

    [Authorize(Roles = "AppAdmin")]
    [HttpDelete("Delete")]
    public async Task<IActionResult> DeleteProduct(Guid productId) 
    {
        try
        {
            var res = await _productService.DeleteProductAsync(productId);
            return Ok(res);
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }
}