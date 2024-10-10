﻿using FastBite.Data.DTOS;
using FastBite.Exceptions;
using FastBite.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Asp.Versioning;


namespace FastBite.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService accountService;
        private readonly ITokenService tokenService;

        public AccountController(IAccountService accountService, ITokenService tokenService)
        {
            this.accountService = accountService;
            this.tokenService = tokenService;
        }

        [Authorize]
        [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPasswordAsync([FromBody] ResetPasswordDTO resetRequest)
        {
            try
            {
                var token = HttpContext.Request.Headers["Authorization"];

                token = token.ToString().Replace("Bearer ", "");

                await accountService.ResetPaswordAsync(resetRequest, token);
                return Ok("Recovery link sent to your email");
            }
            catch (MyAuthException ex)
            {
                return BadRequest($"{ex.Message}\n{ex.AuthErrorType}");
            }
        }


        [Authorize]
        [HttpPost("ConfirmEmail")]
        public async Task<IActionResult> ConfirmEmailAsync()
        {
            try
            {
                var token = HttpContext.Request.Headers["Authorization"];
                token = token.ToString().Replace("Bearer ", "");

                await accountService.ConfirmEmailAsync(token);

                return Ok();
            }
            catch
            {
                throw;
            }
        }

        [HttpGet("ValidateConfirmation")]
        public async Task<IActionResult> ValidateConfirmationAsync([FromQuery] string token)
        {
            try
            {
                 await tokenService.ValidateEmailTokenAsync(token);

                return Ok("Email confirmed successfully");
            }
            catch
            {
                throw;
            }
        }
    }
}
    