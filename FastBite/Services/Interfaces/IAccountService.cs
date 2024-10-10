﻿using FastBite.Data.DTOS;

namespace FastBite.Services.Interfaces;

public interface IAccountService
{
    public Task ResetPaswordAsync(ResetPasswordDTO resetRequest, string token);
    public Task ConfirmEmailAsync(string token);
}
