using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using System.Text;
using Ocelot.Provider.Kubernetes;
using Ocelot.Provider.Consul;
using OpenTelemetry.Trace;

var builder = WebApplication.CreateBuilder(args);


builder.Configuration.AddJsonFile("ocelot.json", optional: false, reloadOnChange: true);

var config = new ConfigurationBuilder()
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddEnvironmentVariables()
    .AddUserSecrets<Program>()
    .Build();





builder.Services.AddOcelot(builder.Configuration)
.AddConsul()
.AddKubernetes();


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins",
         builder =>
         {
             builder.WithOrigins("http://localhost:3000")
                    .AllowAnyMethod()
                    .AllowAnyHeader();
         });

});

var authenticationProviderKey = config["JWTKey"];

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authenticationProviderKey))
        };
    });


builder.Services.AddOpenTelemetry()
                    .WithTracing(builder => builder
                        .AddSource("api_gateway")
                        .AddAspNetCoreInstrumentation()
                        .AddZipkinExporter(b =>
                        {
                            var zipkinHostName = Environment.GetEnvironmentVariable("ZIPKIN_HOSTNAME") ?? "localhost";
                            b.Endpoint = new Uri($"http://{zipkinHostName}:9411/api/v2/spans");
                        }));

var app = builder.Build();

app.UseCors("AllowSpecificOrigins");

app.UseAuthentication();
app.UseAuthorization();

await app.UseOcelot();

app.Run();