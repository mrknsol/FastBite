using System.Security.Claims;
using AutoMapper;
using FastBite.Data.Configs;
using FastBite.Data.Contexts;
using FastBite.Data.DTOS;
using FastBite.Data.Models;
using FastBite.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FastBite.Services.Classes;

public class ReservationService : IReservationService
{
    public FastBiteContext _context;
    public ITokenService _tokenService;
    public IOrderService _orderService;
    private readonly Mapper mapper;

    public ReservationService(FastBiteContext context, ITokenService tokenService, IOrderService orderService)
    {
        _context = context;
        mapper = MappingConfiguration.InitializeConfig();
        _tokenService = tokenService;
        _orderService = orderService;
    }

    public async Task<ReservationDTO> CreateReservationAsync(ReservationDTO reservation)
    {
        var table = _context.Tables.FirstOrDefault(t => t.Capacity == reservation.TableCapacity);
        if (table == null)
        {
            throw new Exception("Table not found with given capacity");
        }

        CreateOrderDTO? order = null;
        if (reservation.Order != null && reservation.Order.phoneNumber != "string" && reservation.Order.ProductNames != null && reservation.Order.ProductNames.Any(p => !string.IsNullOrEmpty(p.ProductName) && p.ProductName != "string" && p.Quantity > 0))  
        {
            order = await _orderService.CreateOrderAsync(reservation.Order);
        }

        var newReservation = new Reservation
        {
            UserId = reservation.UserId,
            TableId = table.Id,
            Date = reservation.date,
            OrderId = order?.Id,
            ConfirmationDate = DateTime.Now
        };

        _context.Reservations.Add(newReservation);
        _context.SaveChanges();

        return mapper.Map<ReservationDTO>(newReservation);
    }

    public async Task DeleteReservation(Guid Id)
    {
        var reservation = await _context.Reservations.FirstOrDefaultAsync(r => r.Id == Id);

        if (reservation == null)
        {
            throw new ArgumentNullException(nameof(reservation));
        }

        _context.Reservations.Remove(reservation);
        await _context.SaveChangesAsync();
    }

    public async Task<ReservationDTO> EditReservation(Guid Id, ReservationDTO reservation)
    {
        var currentReservation = await _context.Reservations
            .Include(r => r.Table)
            .Include(r => r.Order)
            .Include(r => r.User)
            .FirstOrDefaultAsync(r => r.Id == Id);

        if (currentReservation == null)
        {
            throw new Exception("Reservation not found");
        }

        var table = await _context.Tables
            .FirstOrDefaultAsync(t => t.Capacity == reservation.TableCapacity);

        if (table == null)
        {
            throw new Exception("Table not found with given capacity");
        }

        currentReservation.Date = reservation.date;
        currentReservation.TableId = table.Id;

        _context.Reservations.Update(currentReservation);
        await _context.SaveChangesAsync();

        return mapper.Map<ReservationDTO>(currentReservation);
    }

    public async Task<List<ReservationDTO>> GetAllReservationsAsync(string phoneNumber)
    {
        IQueryable<Reservation> query = _context.Reservations;


        query = await Functions.GetFilteredDataByUserRoleAsync(phoneNumber, query, _context);

        var reservations = await query.ToListAsync();
        return mapper.Map<List<ReservationDTO>>(reservations);
    }
}