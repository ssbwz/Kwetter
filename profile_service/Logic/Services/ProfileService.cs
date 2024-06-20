using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using profile_service.model.Models;
using profile_service.model.Repositories;
using profile_service.model.Services;
using Profile_service.message_broker;

namespace profile_service.logic.Services
{
    public class ProfileService : IProfileService
    {
        private readonly IProfileRepository _profileRepository;
        private readonly Messager messager;

        public ProfileService(IProfileRepository profileRepository, IConfiguration configuration)
        {
            this._profileRepository = profileRepository;
            messager = new Messager(configuration);

        }

        public Profile GetProfileByEmail(string email)
        {
            return _profileRepository.GetProfileByEmail(email);
        }

        public Identity GetUserIdentityByEmail(string email)
        {
            return JsonConvert.DeserializeObject<Identity>(messager.CallAsync(new BrokerMessage("account_service", new { email= email}, "get_user")).Result);
        }

        public async void UpdateIdentity(Identity identity)
        {
            await messager.CallAsync(new BrokerMessage("account_service", identity, "update_identity"));
        }

        public void UpdateProfile(Profile profile)
        {
            _profileRepository.UpdateProfile(profile);
        }
    }
}
