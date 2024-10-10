namespace FastBite.Data.DTOS;

public record ProductDTO
(
    string Name,
    string Description,
    string CategoryName,
    string ImageUrl,
    int Price
);