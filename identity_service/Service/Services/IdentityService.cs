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
            newIdentity = identityStorage.SaveIdentity(newIdentity);
            messageBroker.SendMessage(newIdentity.Email, configuration["Broker:create-profile-queue"]);
            return newIdentity;
        }
    }
}
