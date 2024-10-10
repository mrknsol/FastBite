using FastBite.Data.DTOS;
using FastBite.Data.Models;

namespace FastBite.Services.Interfaces;

public interface IReservationService {
    public Task<List<ReservationDTO>> GetAllReservationsAsync(string phoneNumber);
    public Task<ReservationDTO> CreateReservationAsync(ReservationDTO reservation);
    public Task<ReservationDTO> EditReservation(Guid Id, ReservationDTO reservation);
    public Task DeleteReservation(Guid Id);
}