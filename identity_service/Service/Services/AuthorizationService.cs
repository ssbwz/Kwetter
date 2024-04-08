using Microsoft.IdentityModel.Tokens;
using Models.Auth;
using Models.Exceptions;
using Models.Identities;
using Models.Services_Interfaces;
using Models.Storage_Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;


namespace Service.Services
{
    public class AuthorizationService : IAuthorizationService
    {
        private IConfiguration _configuration { get; }

        private IIdentityStorage _identityStorage;

        public AuthorizationService(IConfiguration configuration, IIdentityStorage identityStorage)
        {
            this._configuration = configuration;
            this._identityStorage = identityStorage;
        }
        public LoginResponse Login(LoginRequest request)
        {
            Identity? identity = _identityStorage.GetIdentityByEmail(request.Email);

            if (identity == null)
            {
                throw new AssetNotFoundException($"Asset with ID {request.Email} not found.");
            }

            var claims = new[]
            {
            new Claim("Email", identity.Email),
            new Claim("Role", identity.Role)
            };

            var jwtToken = generateJwtToken(claims);

            return new LoginResponse(jwtToken);

            string generateJwtToken(Claim[] claims)
            {
                var jwtkey = _configuration["JWTSettings:key"];

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtkey));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.UtcNow.AddMinutes(15),
                    signingCredentials: creds
                );

                return new JwtSecurityTokenHandler().WriteToken(token);
            }
        }
    }
}
