﻿using FastBite.Data.Contexts;
using FastBite.Data.DTOS;
using FastBite.Exceptions;
using FastBite.Services.Classes;
using FastBite.Services.Interfaces;
using FastBite.Validators;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Asp.Versioning;

namespace FastBite.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class AuthController : ControllerBase
{
    private readonly LoginUserValidator loginValidator;
    private readonly RegisterUserValidator registerValidator;
    private readonly IAuthService authService;


    public AuthController(LoginUserValidator loginValidator, RegisterUserValidator registerValidator, IAuthService authService)
    {
        this.loginValidator = loginValidator;
        this.registerValidator = registerValidator;
        this.authService = authService;
    }

    [HttpPost("Login")]
    public async Task<IActionResult> LoginAsync([FromBody] LoginDTO user)
    {
        var validationResult = loginValidator.Validate(user);

        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors);
        }

        try
        {
            var res = await authService.LoginUserAsync(user);

            return Ok(res);
        }
        catch (MyAuthException ex)
        {
            return BadRequest($"{ex.Message}\n{ex.AuthErrorType}");
        }
    }

    [HttpPost("Register")]
    public async Task<IActionResult> RegisterAsync([FromBody] RegisterDTO user)
    {
        try
        {
            var validationResult = registerValidator.Validate(user);
            if (!validationResult.IsValid)
            {
                return BadRequest(validationResult.Errors);
            }
            var res = await authService.RegisterUserAsync(user);
            return Ok(res);
        }
        catch (MyAuthException ex)
        {
            return BadRequest($"{ex.Message}\n{ex.AuthErrorType}");
        }
    }


    [HttpPost("Refresh")]
    public async Task<IActionResult> RefreshTokenAsync(TokenDTO refresh)
    {
        try
        {
            var newToken = await authService.RefreshTokenAsync(refresh);

            if (newToken is null)
                return BadRequest("Invalid token");

            return Ok(newToken);
        }
        catch (MyAuthException ex)
        {
            return BadRequest($"{ex.Message}\n{ex.AuthErrorType}");
        }

    }


    [Authorize]
    [HttpPost("Logout")]
    public async Task<IActionResult> LogoutAsync(TokenDTO logout)
    {
        try
        {
            await authService.LogOutAsync(logout);
            return Ok("Logged out successfully");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }


   
}
