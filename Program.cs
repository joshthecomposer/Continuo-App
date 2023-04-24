using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Http;
using System.Text;

using MyApp.Data;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
var jwtSecret = builder.Configuration["JWTSecretKey"];
var key = Encoding.ASCII.GetBytes(jwtSecret!);
builder.Services.AddControllersWithViews();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();
builder.Services.AddDbContext<DBContext>(options =>
{
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
});

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = true;
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero
        };
    });

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    // app.UseHsts();
}

// app.UseHttpsRedirection(); //TODO: See if this is needed
app.UseStaticFiles();

app.UseRouting();

app.UseCors(cfg => cfg.AllowAnyOrigin());

app.UseAuthorization();

app.MapControllerRoute(
        name: "Login",
        pattern: "login",
        defaults: new { controller = "Public", action = "Index" }
);

app.MapControllerRoute(
        name: "Register",
        pattern: "register",
        defaults: new { controller = "Public", action = "Index" }
);

app.MapControllerRoute(
        name: "Dashboard",
        pattern: "dashboard",
        defaults: new { controller = "Public", action = "Index" }
);

app.MapControllerRoute(
        name: "Data",
        pattern: "data",
        defaults: new { controller = "Public", action = "Index" }
);

app.MapControllerRoute(
    name: "default",
    pattern: "/",
    defaults: new { controller = "Public", action = "Index" }
);

app.MapControllerRoute(
    name: "CatchAll",
    pattern: "{*url}",
    defaults: new { controller = "Public", action = "CatchRoute" }
);

app.Run();
