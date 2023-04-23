using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using MyApp.Models;

namespace MyApp.Controllers;
[Authorize]
[ApiController]
[Route("api")]
public class TestController : ControllerBase
{
    [HttpGet("data")]
    public User GetData()
    {
        return new User
        {
            FirstName="Michael Jordan",
            Email="mj@gmail.com"
        };
    }
}