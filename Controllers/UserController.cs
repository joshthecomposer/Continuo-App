using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using MyApp.Models;
using MyApp.Data;

namespace MyApp.Controllers;
[Authorize]
[ApiController]
[Route("api/users")]
public class UserController : ControllerBase
{
    private readonly DBContext _context;
    public UserController(DBContext context)
    {
        _context = context;
    }

    [HttpGet("{id}/dashboard")]
    public async Task<ActionResult<Object>> GetUserDashboardInfo(int id)
    {
        bool IsValid = AuthController.VerifyClaim(AuthenticationHeaderValue.Parse(Request.Headers["Authorization"]), id);
        if (!IsValid)
        {
            return Unauthorized(new { message = "Claim verification failed in GetUserDashboardInfo Action" });
        }
        Object? result = await _context.Users
            .Include(u=>u.Instruments)
            .Where(u => u.UserId == id)
            .Select(u=>new{
                UserId = u.UserId,
                FirstName = u.FirstName,
                LastName = u.LastName,
                Email = u.Email,
                Instruments = u.Instruments.Select(i=>new
                {
                    InstrumentId = i.InstrumentId,
                    Name = i.Name,
                    Color= i.Color,
                    Image = i.Image
                })
            })
            .FirstOrDefaultAsync();

        return Ok(result);
    }
}