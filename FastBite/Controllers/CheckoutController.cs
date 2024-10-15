using FastBite.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace FastBite.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class CheckoutController : ControllerBase {
    public string PayPalClientId { get; set; } = "";
    public string PayPalSecret { get; set; } = "";
    public string PayPalUrl { get; set; } = "";
    public ICheckoutService _checkoutService;

    public CheckoutController(IConfiguration configuration, ICheckoutService checkoutService)
    {
        PayPalClientId = configuration["PayPalSettings:ClientId"];
        PayPalSecret = configuration["PayPalSettings:Secret"];
        PayPalUrl = configuration["PayPalSettings:Url"];
        _checkoutService = checkoutService;
    }

    [HttpGet("GetPayPalAccessToken")]
    public async Task<IActionResult> GetPayPalAccessToken() {
        var accessToken = await _checkoutService.GetPayPalAccessTokenAsync(PayPalUrl, PayPalClientId, PayPalSecret);
        
        return Ok(accessToken);
    }
}