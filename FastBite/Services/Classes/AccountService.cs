using FastBite.Data.Contexts;
using FastBite.Data.Models;
using FastBite.Data.DTOS;
using FastBite.Exceptions;
using FastBite.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Text;
using static BCrypt.Net.BCrypt;

namespace FastBite.Services.Classes;

public class AccountService : IAccountService
{
    private readonly IEmailSender emailSender;
    private readonly ITokenService tokenService;
    private readonly FastBiteContext context; 

    public AccountService(IEmailSender emailSender, ITokenService tokenService, FastBiteContext context)
    {
        this.emailSender = emailSender;
        this.tokenService = tokenService;
        this.context = context;
    }


    public async Task ConfirmEmailAsync(string token)
    {
        var principal = tokenService.GetPrincipalFromToken(token, validateLifetime: true); 

        var email = principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;

        var user = context.Users.FirstOrDefault(u => u.Email == email);

        if (user == null)
        {
            throw new MyAuthException(AuthErrorTypes.UserNotFound, "User not found");
        }

        var confirmationToken = await tokenService.GenerateEmailTokenAsync(user.Id.ToString());

        var link = $"http://localhost:5156/api/v1/Account/ValidateConfirmation?token={confirmationToken}";

        
        StringBuilder sb = new( File.ReadAllText("/Users/mrknsol/Documents/FastBite0/FastBite-FastBite/FastBite/assets/email.html"));
        
        sb.Replace("[Confirmation Link]", link);
        sb.Replace("[Year]", DateTime.Now.Year.ToString());
        sb.Replace("[Recipient's Name]", user.Email);
        sb.Replace("[Your Company Name]", "JWT Identity");
        
        await emailSender.SendEmailAsync(user.Email, "Email confirmation", sb.ToString(), isHtml: true);
    }

    public async Task ResetPaswordAsync(ResetPasswordDTO resetRequest, string token)
    {
        
        var principal = tokenService.GetPrincipalFromToken(token, validateLifetime: true);

        var email = principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;

        var user = await context.Users.FirstOrDefaultAsync(u => u.Email == email);

        if (user == null)
        {
            throw new MyAuthException(AuthErrorTypes.UserNotFound, "User not found");
        }

        if (!Verify(resetRequest.OldPassword, user.Password))
        {
            throw new MyAuthException(AuthErrorTypes.InvalidCredentials, "Invalid credentials");
        }

        if (resetRequest.NewPassword != resetRequest.ConfirmNewPassword)
        {
            throw new MyAuthException(AuthErrorTypes.PasswordMismatch, "Passwords do not match");
        }
        
        user.Password = HashPassword(resetRequest.NewPassword);

        await emailSender.SendEmailAsync(user.Email, "Password Reset", "Your password has been reset");

        await context.SaveChangesAsync();
    }
}
