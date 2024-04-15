using Microsoft.Extensions.Configuration;
using Models.Identities;
using Models.Services_Interfaces;
using Models.Storage_Interfaces;

namespace Service.Services
{
    public class IdentityService(IIdentityStorage identityStorage, IMessageBroker messageBroker, IConfiguration configuration) : IIdentityService
    {
        public Identity CreateIdentity(Identity newIdentity)
        {
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
    }
}
