using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using profile_service.logic.Services;
using profile_service.model.Repositories;
using profile_service.model.Services;
using profile_service.storage.DbContext;
using profile_service.storage.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

var config = new ConfigurationBuilder()
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddEnvironmentVariables()
    .Build();

builder.Services.AddTransient<IProfileRepository, ProfileRepository>();
builder.Services.AddTransient<IProfileService, ProfileService>();

builder.Services.AddHostedService<MessageBroker>();

builder.Services.AddDbContext<ProfileContext>(options =>
{
    options.UseNpgsql(
        config["ConnectionStrings:url"],
        x => { x.MigrationsAssembly("profile_service"); });
});

builder.Services.AddSwaggerGen();

var app = builder.Build();

app.Use(async (context, next) =>
{
    await next.Invoke();
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<ProfileContext>();
    dbContext.Database.Migrate();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
