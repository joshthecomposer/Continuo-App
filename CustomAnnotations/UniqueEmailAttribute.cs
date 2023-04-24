using System.ComponentModel.DataAnnotations;
using MyApp.Data;

namespace MyApp.CustomAnnotations;
public class UniqueEmailAttribute : ValidationAttribute
{
    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        if(value == null)
        {
            return new ValidationResult("Field is required");
        }

        DBContext _context = (DBContext)validationContext.GetService(typeof(DBContext))!;
        if(_context.Users.Any(e=>e.Email == value.ToString()))
        {
            return new ValidationResult("Email must be unique");
        }
        else
        {
            return ValidationResult.Success;
        }
    }
}