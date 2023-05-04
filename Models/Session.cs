#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace MyApp.Models;
public class Session : BaseEntity
{
    [Key]
    public int SessionId { get; set; }

    public bool InProgress { get; set; } = true;
    public DateTime Start { get; set; } = DateTime.UtcNow;
    [Range(0, int.MaxValue, ErrorMessage = "That is 68,000 years of practice. Take a break!")]
    public int Seconds { get; set; } = 0;

    //Foreign Keys
    [Required]
    public int UserId { get; set; }
    [Required]
    public int InstrumentId { get; set; }

    //DB Associations
    [JsonIgnore]
    public User? User { get; set; }
    public Instrument? Instrument { get; set; }
}