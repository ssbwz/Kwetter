    using Storage.Services;
using Storage.DbContext;
using Models.Services_Interfaces;
using Service.Services;
using Microsoft.EntityFrameworkCore;
using Models.Storage_Interfaces;
using Storage.Storages;
using Models.Mappers;
using Storage.Seeding;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var config = new ConfigurationBuilder()
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddUserSecrets<Program>()
    .AddEnvironmentVariables()
    .Build();

builder.Services.AddTransient<IIdentityStorage, IdentityStorage>();
builder.Services.AddTransient<IAuthorizationService, AuthorizationService>();
builder.Services.AddTransient<IIdentityService, IdentityService>();
builder.Services.AddTransient<IIdentityStorage, IdentityStorage>();
builder.Services.AddTransient<IMessageBroker, MessageBroker>();

builder.Services.AddAutoMapper(typeof(IdentityMapper));

builder.Services.AddHostedService<RPCServer>();
builder.Services.AddHealthChecks();
builder.Services.AddDbContext<IdentityContext>(options =>
{
    options.UseNpgsql(
        config["ConnectionStrings:url"],
        x => { x.MigrationsAssembly("identity_service"); });
});

var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<IdentityContext>();
    dbContext.Database.Migrate();

    if (!dbContext.Identities.Any())
    {
        dbContext.Database.EnsureCreated();
        var data = new DataSeeding().GetIdentitys();

        dbContext.Identities.AddRange(data);

        dbContext.SaveChanges();
    }
}

app.UseRouting();

app.UseEndpoints(endpoints =>
    {
        endpoints.MapControllers();
        endpoints.MapHealthChecks("/health");
    });

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
