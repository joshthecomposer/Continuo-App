using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using MyApp.Models;

namespace MyApp.Controllers;
[Authorize]
[ApiController]
[Route("api/users")]
public class UserController : ControllerBase
{   
    #pragma warning disable CS1998
    [HttpGet("{id}/dashboard")]
    public async Task<ActionResult<Dictionary<string, string>>> GetUserDashboardInfo(int id)
    {
        bool IsValid = AuthController.VerifyClaim(AuthenticationHeaderValue.Parse(Request.Headers["Authorization"]), id);
        if (!IsValid)
        {
            return Unauthorized(new { message = "Claim verification failed in GetUserDashboardInfo Action" });
        }
        Dictionary<string, string> result = new Dictionary<string, string>{{ "Item1","Memes"}, {"Item2", "Dreams"}};
        Console.WriteLine("Result of GetUserDashboardInfo request: "+ JsonSerializer.Serialize(result));
        return Ok(result);
    }
    #pragma warning restore CS1998
}