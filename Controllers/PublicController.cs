using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace MyApp.Controllers;
public class PublicController : Controller
{
    public ViewResult Index()
    {
        return View();
    }

    public ViewResult CatchRoute()
    {
        return View();
    }
}
