#pragma warning disable CS8618
using Microsoft.EntityFrameworkCore;
using MyApp.Models;

namespace MyApp.Data;
public class DBContext : DbContext 
{   
    public DBContext(DbContextOptions options) : base(options) { }      
    public DbSet<User> Users { get; set; }
    public DbSet<Instrument> Instruments { get; set; }
    public DbSet<RefreshToken> RefreshTokens { get; set; }
    public DbSet<Session> Sessions { get; set; }
}