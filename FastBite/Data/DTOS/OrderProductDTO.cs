using FastBite.Data.Models;

namespace FastBite.Data.DTOS;

public record OrderProductDTO
(
     string ProductName,
     int Quantity
);