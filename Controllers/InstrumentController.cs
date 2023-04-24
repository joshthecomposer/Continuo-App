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
[Route("api/instruments")]
public class InstrumentController : ControllerBase
{
    private readonly DBContext db;
    public InstrumentController(DBContext context)
    {
        db = context;
    }

    [HttpPost("create")]
    public async Task<ActionResult<Instrument>> CreateInstrument([FromBody] Instrument newInstrument)
    {
        Console.WriteLine("Testerino");
        if (ModelState.IsValid)
        {
            bool IsValid = AuthController.VerifyClaim(AuthenticationHeaderValue.Parse(Request.Headers["Authorization"]), newInstrument.UserId);
            if (!IsValid)
            {
                return Unauthorized(new { message = "Claim verification failed from CreateInstrument Action" });
            }
            db.Add(newInstrument);
            await db.SaveChangesAsync();
            return CreatedAtAction(
                nameof(GetCreatedInstrumentAsync),
                new { id = newInstrument.InstrumentId },
                newInstrument
            );
        }
        return BadRequest(new {Message="This endpoint is not fully implemented yet..."});
    }

    [ApiExplorerSettings(IgnoreApi = true)]
    [ActionName(nameof(GetCreatedInstrumentAsync))]
    public async Task<ActionResult<Instrument>> GetCreatedInstrumentAsync(int id)
    {
        Instrument? instrument = await db.Instruments.Where(i=>i.UserId == id).FirstOrDefaultAsync();
        if (instrument != null)
        {
            return instrument;
        }
        return BadRequest(new{Message="Something went wrong when attempting to save the instrument in the database."});
    }

}