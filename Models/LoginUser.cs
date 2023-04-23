#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;

namespace MyApp.Models;
public class LoginUser
{
    [Required(ErrorMessage = "Field is required.")]
    public string Email { get; set; }
    [Required(ErrorMessage = "Field is required.")]
    public string Password { get; set; }
}