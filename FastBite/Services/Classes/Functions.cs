using Microsoft.EntityFrameworkCore;
using FastBite.Data.Models;
using FastBite.Data.Contexts;
using FastBite.Data.DTOS;
namespace FastBite.Services.Classes;
public static class Functions
{
    public static async Task<IQueryable<T>> GetFilteredDataByUserRoleAsync<T>(
        string phoneNumber, 
        IQueryable<T> query, 
        FastBiteContext _context 
    ) where T : class
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.phoneNumber == phoneNumber);
        var userRole = await _context.UserRoles
            .Where(ur => ur.UserId == user.Id)
            .Include(u => u.AppRole)
            .ToListAsync();

        if (!userRole.Any(u => u.AppRole.Name == "AppAdmin"))
        {
            query = query.Where(q => EF.Property<Guid>(q, "UserId") == user.Id);
        }

        return query;
    }

}
