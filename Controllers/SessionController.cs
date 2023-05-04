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

    [HttpGet("{userId}/latest/{instrumentId}")]
    public async Task<ActionResult<Session>> GetLatest(int userId, int instrumentId)
    {
        bool IsValid = AuthController.VerifyClaim(AuthenticationHeaderValue.Parse(Request.Headers["Authorization"]), userId);
        if (!IsValid)
        {
            return Unauthorized(new { message = "Claim verification failed from GetLastest Action in SessionController" });
        }

        Session? latest = await db.Sessions.Where(s => s.InProgress == true && s.UserId == userId && s.InstrumentId == instrumentId).FirstOrDefaultAsync();
        if (latest == null)
        {
            return NotFound(new { message = "No in-progress session found. For this instrument." });
        }
        return Ok(latest);
    }

    [HttpPost("create")]
    public async Task<ActionResult<Session>> Create([FromBody] Session newSession)
    {
        if (ModelState.IsValid)
        {
            bool IsValid = AuthController.VerifyClaim(AuthenticationHeaderValue.Parse(Request.Headers["Authorization"]), newSession.UserId);
            if (!IsValid)
            {
                return Unauthorized(new { message = "Claim verification failed from GetLastest Action in SessionController" });
            }
            db.Sessions.Add(newSession);
            await db.SaveChangesAsync();
            return CreatedAtAction(
                nameof(GetCreatedSessionAsync),
                new { id = newSession.SessionId },
                newSession
            );
        }

        return BadRequest();
    }

    [ApiExplorerSettings(IgnoreApi = true)]
    [ActionName(nameof(GetCreatedSessionAsync))]
    public async Task<ActionResult<Session>> GetCreatedSessionAsync(int id)
    {
        Session? session = await db.Sessions.Where(i=>i.UserId == id).FirstOrDefaultAsync();
        if (session != null)
        {
            return session;
        }
        return BadRequest(new{Message="Something went wrong when attempting to save the instrument in the database."});        
    }
}