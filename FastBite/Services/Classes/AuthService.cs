using FastBite.Data.Contexts;
using FastBite.Data.Models;
using FastBite.Data.DTOS;
using FastBite.Exceptions;
using FastBite.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using static BCrypt.Net.BCrypt;
using AutoMapper;
using FastBite.Data.Configs;

namespace FastBite.Services.Classes;

public class AuthService : IAuthService
{
    private readonly FastBiteContext context;
    private readonly ITokenService tokenService;
    private readonly IBlackListService blackListService;
    private readonly Mapper mapper;
    public AuthService(FastBiteContext context, ITokenService tokenService, IBlackListService blackListService, IEmailSender emailSender)
    {
        this.context = context;
        this.tokenService = tokenService;
        this.blackListService = blackListService;
        mapper = MappingConfiguration.InitializeConfig();
    }

    public async Task<AccessInfoDTO> LoginUserAsync(LoginDTO user)
    {
        try
        {
            var foundUser = await context.Users.FirstOrDefaultAsync(u => u.Email == user.Email);

            if (foundUser == null)
            {
                throw new MyAuthException(AuthErrorTypes.UserNotFound, "User not found");
            }

            if (!Verify(user.Password, foundUser.Password))
            {
                throw new MyAuthException(AuthErrorTypes.InvalidCredentials, "Invalid credentials");
            }

            var tokenData = new AccessInfoDTO(
                foundUser.Name,
                foundUser.Email,
                await tokenService.GenerateTokenAsync(foundUser),
                await tokenService.GenerateRefreshTokenAsync(),
                DateTime.Now.AddDays(1)
            );

            foundUser.RefreshToken = tokenData.RefreshToken;
            foundUser.RefreshTokenExpiryTime = tokenData.RefreshTokenExpireTime;

            await context.SaveChangesAsync();

            return tokenData;
        }
        catch
        {
            throw;
        }
    }

    public async Task LogOutAsync(TokenDTO userTokenInfo)
    {
        if (userTokenInfo is null)
            throw new MyAuthException(AuthErrorTypes.InvalidRequest, "Invalid client request");

        var principal = tokenService.GetPrincipalFromToken(userTokenInfo.AccessToken);

        var email = principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;

        var user = context.Users.FirstOrDefault(u => u.Email == email);

        user.RefreshToken = null;
        user.RefreshTokenExpiryTime = DateTime.Now;
        await context.SaveChangesAsync();

        blackListService.AddTokenToBlackList(userTokenInfo.AccessToken);
    }

    public async Task<AccessInfoDTO> RefreshTokenAsync(TokenDTO userAccessData)
    {
        if (userAccessData is null)
            throw new MyAuthException(AuthErrorTypes.InvalidRequest, "Invalid client request");

        var accessToken = userAccessData.AccessToken;
        var refreshToken = userAccessData.RefreshToken;

        var principal = tokenService.GetPrincipalFromToken(accessToken);

        var email = principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
        var name = principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

        var user = context.Users.FirstOrDefault(u => u.Email == email);

        if (user == null || user.RefreshToken != refreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
            throw new MyAuthException(AuthErrorTypes.InvalidRequest, "Invalid client request");

        var newAccessToken = await tokenService.GenerateTokenAsync(user);
        var newRefreshToken = await tokenService.GenerateRefreshTokenAsync();

        user.RefreshToken = newRefreshToken;
        user.RefreshTokenExpiryTime = DateTime.Now.AddDays(1);

        await context.SaveChangesAsync();

        return new AccessInfoDTO(
            name,
            email,
            newAccessToken,
            newRefreshToken,
            user.RefreshTokenExpiryTime);
    }

    public async Task<RegisterDTO> RegisterUserAsync(RegisterDTO user)
    {
        try
        {
            var role = await context.AppRoles.Where(x => x.Name == "AppUser").FirstOrDefaultAsync();

            if (role == null) {
                throw new Exception("Role not found");
            }
            
            var newUser = new User
            {
                Name = user.Name,
                Surname = user.Surname,
                Email = user.Email,
                Password = HashPassword(user.Password),
                phoneNumber = user.phoneNumber
            };
            
            await context.Users.AddAsync(newUser);
            await context.SaveChangesAsync();

            var roleToApply = new UserRole()
            {
                RoleId = role.Id,
                UserId = newUser.Id
            };

            context.UserRoles.Add(roleToApply);
            await context.SaveChangesAsync();
            
            return mapper.Map<RegisterDTO>(newUser);
        }
        catch
        {
            throw;
        }
    }
}