#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace MyApp.Models;
public class Instrument : BaseEntity
{
    [Key]
    public int InstrumentId { get; set; }
    [Required(ErrorMessage = "Field is required.")]
    [MinLength(2, ErrorMessage = "At least two characters.")]
    [MaxLength(15, ErrorMessage="Max 15 characters")]
    public string Name { get; set; }
    public string Color { get; set; } = "neutral";
    [Required]
    public string Image { get; set; }
    //Foreign Keys
    [Required(ErrorMessage = "UserId is required")]
    public int UserId { get; set; }
    //Associated entities;
    [JsonIgnore]
    public User? User { get; set; }
    public List<Session> Sessions { get; set; } = new List<Session>();
}