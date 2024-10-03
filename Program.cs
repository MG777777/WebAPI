using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using KontaktAPP.Data;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<KontaktAPPContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("KontaktAPPContext") ?? throw new InvalidOperationException("Connection string 'KontaktAPPContext' not found.")));

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors(policy =>
    policy.WithOrigins("http://localhost:3000") //i use cors to allow react app using API backend
          .AllowAnyMethod()
          .AllowAnyHeader()
);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
