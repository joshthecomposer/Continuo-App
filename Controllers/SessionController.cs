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
[Route("api/sessions")]
public class SessionController : ControllerBase
{
    private readonly DBContext db;
    public SessionController(DBContext context)
    {
        db = context;
    }

    [HttpGet("{userId}/latest")]
    public async Task<ActionResult<Session>> GetLatest(int userId)
    {
        Session? latest = await db.Sessions.Where(s => s.UserId == userId).FirstOrDefaultAsync();
        return BadRequest(new { message = "This endpoint is not fully implemented yet." });
    }
}