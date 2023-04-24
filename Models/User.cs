#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using MyApp.CustomAnnotations;

namespace MyApp.Models;
public class User : BaseEntity
{
    [Key]
    public int UserId { get; set; }
    [Required(ErrorMessage = "Field is required.")]
    [MinLength(2, ErrorMessage = "At least two characters.")]
    public string FirstName { get; set; }
    [Required(ErrorMessage = "Field is required.")]
    [MinLength(2, ErrorMessage = "At least two characters.")]
    public string LastName { get; set; }
    [UniqueEmail]
    [EmailAddress(ErrorMessage = "Invalid Email.")]
    public string Email { get; set; }
    [Required(ErrorMessage = "Field is required.")]
    [MinLength(8, ErrorMessage = "At least 8 characters.")]
    public string Password { get; set; }
    [NotMapped]
    [Required(ErrorMessage = "Field is required.")]
    [Compare("Password", ErrorMessage = "Passwords did not match.")]
    public string Confirm { get; set; }

    //Relationships
    public List<Instrument> Instruments { get; set; } = new List<Instrument>();
    public List<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();
}