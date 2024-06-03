using AutoMapper;
using Microsoft.Extensions.Configuration;
using Models.Identities;
using Models.Services_Interfaces;
using Models.Storage_Interfaces;
using System.Security.Cryptography;

namespace Service.Services
{
    public class IdentityService(IMapper mapper,IIdentityStorage identityStorage, IMessageBroker messageBroker, IConfiguration configuration) : IIdentityService
    {
        private const int SaltSize = 16;
        private const int KeySize = 32;
        private const int Iterations = 10000;

        public Identity CreateIdentity(Identity newIdentity)
        {
            (newIdentity.HashedPassword, newIdentity.Salt) = HashPassword(newIdentity.HashedPassword);
            messageBroker.SendMessage(newIdentity.Email, configuration["Broker:create-profile-queue"]);
            newIdentity = identityStorage.SaveIdentity(newIdentity);
            return newIdentity;
        }

        public void DeleteIdentity(string email)
        {
            Identity identity = identityStorage.GetIdentityByEmail(email);
            if (identity == null)
            {
                return;
            }
            messageBroker.SendMessage(identity.Email, configuration["Broker:delete-profile-queue"]);
            messageBroker.SendMessage(identity.Email, configuration["Broker:delete-publisher-queue"]);
            identityStorage.DeleteIdentity(identity);
        }

        public Identity GetIdentity(string email)
        {
            return identityStorage.GetIdentityByEmail(email);
        }

        public List<GetIdentityDTO> GetAllIdentity(int pageNumber)
        {
            List<Identity> identities = identityStorage.GetAllIdentity(pageNumber);
            return mapper.Map<List<GetIdentityDTO>>(identities);

        }


        public (string Hash, string Salt) HashPassword(string password)
        {
            byte[] salt = new byte[SaltSize];
            using (var rng = new RNGCryptoServiceProvider())
            {
                rng.GetBytes(salt);
            }

            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, Iterations, HashAlgorithmName.SHA256);
            byte[] hash = pbkdf2.GetBytes(KeySize);

            string base64Salt = Convert.ToBase64String(salt);
            string base64Hash = Convert.ToBase64String(hash);

            return (base64Hash, base64Salt);
        }

        public Identity Update(Identity updateIdentity)
        {
            return identityStorage.Update(updateIdentity);
        }
    }
}
