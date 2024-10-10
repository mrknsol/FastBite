using System.Security.Claims;
using FastBite.Data.Contexts;
using FastBite.Data.DTOS;
using FastBite.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;

namespace FastBite.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class ReservationController : ControllerBase {
    public FastBiteContext _context;
    public IReservationService _reservationService;

    public ReservationController(FastBiteContext context, IReservationService reservationService) {
        _context = context;
        _reservationService = reservationService;
    }

    [HttpGet("Get")]
    public async Task<IActionResult> GetAllReservations(string phoneNumber) {
        
        var res = await _reservationService.GetAllReservationsAsync(phoneNumber);

        return Ok(res);
    }

    [HttpPost("Create")]
    public async Task<IActionResult> CreateReservation([FromBody] ReservationDTO reservation) {
        
        if (reservation == null) {
            throw new ArgumentNullException(nameof(reservation));
        }
        
        var newReservation = await _reservationService.CreateReservationAsync(reservation);

        return Ok(newReservation);
    }

    [HttpDelete("Delete")]
    public async Task<IActionResult> DeleteReservation(Guid Id) {
        
        var res = _reservationService.DeleteReservation(Id);

        return Ok(res);
    }

    [HttpPut("Edit")]
    public async Task<IActionResult> EditReservation(Guid Id, [FromBody] ReservationDTO reservation) {
        
        var res = _reservationService.EditReservation(Id, reservation);
        
        return Ok(res);
    }

}