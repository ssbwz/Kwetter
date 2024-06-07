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
using System.Security.Cryptography;


namespace Service.Services
{
    public class AuthorizationService : IAuthorizationService
    {
        private IConfiguration _configuration { get; }
        private IIdentityStorage _identityStorage;
        private const int KeySize = 32;
        private const int Iterations = 10000;

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
                throw new UnAuthorizedException("Please check you password and email.");
            }

            if (identity.UserLoginAttempt.AttemptsCount >= 10)
            {
                throw new ValidationException("You reach the max login attempts, your account is locked, conntact customer support.");
            }

            if (!verifyPassword(request.Password, identity.HashedPassword, identity.Salt))
            {
                identity.UserLoginAttempt.AttemptsCount++;
                _identityStorage.Update(identity);
                throw new UnAuthorizedException("Please check you password and email.");
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
                var jwtkey = _configuration["JWTKey"];

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtkey));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.UtcNow.AddMinutes(15),
                    signingCredentials: creds
                );

                return new JwtSecurityTokenHandler().WriteToken(token);
            }

            bool verifyPassword(string password, string storedHash, string storedSalt)
            {
                byte[] salt = Convert.FromBase64String(storedSalt);

                var pbkdf2 = new Rfc2898DeriveBytes(password, salt, Iterations, HashAlgorithmName.SHA256);
                byte[] hash = pbkdf2.GetBytes(KeySize);

                // Convert the stored hash from Base64
                byte[] storedHashBytes = Convert.FromBase64String(storedHash);

                for (int i = 0; i < KeySize; i++)
                {
                    if (storedHashBytes[i] != hash[i])
                    {
                        return false;
                    }
                }
                return true;
            }
        }
    }
}
