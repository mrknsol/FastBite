﻿using FastBite.Data.DTOS;
using FluentValidation;

namespace FastBite.Validators;

public class RegisterUserValidator : AbstractValidator<RegisterDTO>
{
    public RegisterUserValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .WithMessage("Name is required")
            .Matches(@"^[a-zA-Zа-яА-Я]+$")
            .WithMessage("Name should only contain letters")
            .MinimumLength(2)
            .WithMessage("Name must be at least 2 characters long");

        RuleFor(x => x.Surname)
            .NotEmpty()
            .WithMessage("Surname is required")
            .Matches(@"^[a-zA-Zа-яА-Я]+$")
            .WithMessage("Surname should only contain letters")
            .MinimumLength(2)
            .WithMessage("Surname must be at least 2 characters long");
        RuleFor(x => x.Email)
            .NotEmpty()
            .WithMessage("Email is required")
            .EmailAddress()
            .WithMessage("Valid Email is required");

        RuleFor(x => x.Password)
            .NotEmpty()
            .WithMessage("Password is required")
            .Matches(RegexPatterns.passwordPattern)
            .When(x => x.Password != null);

        RuleFor(x => x.ConfirmPassword)
            .NotEmpty()
            .WithMessage("Confirm Password is required")
            .Equal(x => x.Password)
            .WithMessage("Password and Confirm Password must match");
    }
}
