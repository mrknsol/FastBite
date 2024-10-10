using FastBite.Data.Models;

namespace FastBite.Data.DTOS;

public record CreateOrderDTO
(
    Guid Id,
    ICollection<OrderProductDTO> ProductNames,
    string phoneNumber
);