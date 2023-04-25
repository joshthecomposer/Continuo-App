#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;

namespace MyApp.Models;
public class Instrument : BaseEntity
{
    [Key]
    public int InstrumentId { get; set; }
    [Required(ErrorMessage = "Field is required.")]
    [MinLength(2, ErrorMessage = "At least two characters.")]
    public string Name { get; set; }
    public string Color { get; set; } = "neutral";
    [Required]
    public string Image { get; set; }
    //Foreign Keys
    [Required(ErrorMessage = "UserId is required")]
    public int UserId { get; set; }
    //Associated entities;
    public User? User { get; set; }
}