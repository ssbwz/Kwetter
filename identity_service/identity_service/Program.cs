using Storage.Services;
using Storage.DbContext;
using Models.Services_Interfaces;
using Service.Services;
using Microsoft.EntityFrameworkCore;
using Models.Storage_Interfaces;
using Storage.Storages;
using Azure.Identity;
using Azure.Extensions.AspNetCore.Configuration.Secrets;
using Azure.Security.KeyVault.Secrets;

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


var credential = new ClientSecretCredential(config["AzureKeyVault:TenantId"], config["AzureKeyVault:ClientId"], config["AzureKeyVault:ClientSecret"]);
var client = new SecretClient(new Uri($"https://{config["AzureKeyVault:VaultName"]}.vault.azure.net/"), credential);
builder.Configuration.AddAzureKeyVault(client, new AzureKeyVaultConfigurationOptions());

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
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
