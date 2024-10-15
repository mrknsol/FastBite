namespace FastBite.Services.Interfaces
{
    public interface ICheckoutService
    {
        public Task<string> GetPayPalAccessTokenAsync(string PayPalUrl, string PayPalClientId, string PayPalSecret);
    }
}