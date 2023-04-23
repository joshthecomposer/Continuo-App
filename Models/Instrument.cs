#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;

namespace MyApp.Models;
public class Instrument
{
    [Key]
    public int InstrumentId { get; set; }
    [Required(ErrorMessage = "Field is required.")]
    [MinLength(2, ErrorMessage = "At least two characters.")]
    public string Name { get; set; }
    //TODO: Abstract away the datetimes into a base class.
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime UpdatedAt { get; set; } = DateTime.Now;
    //Foreign Keys
    public int UserId { get; set; }
    //Associated entities;
    public User? User { get; set; }
}