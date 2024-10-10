using FastBite.Data.DTOS;

namespace FastBite.Data.DTOS;
public record ReservationDTO (
    DateTime date,
    int TableCapacity,
    Guid UserId,
    CreateOrderDTO? Order
);