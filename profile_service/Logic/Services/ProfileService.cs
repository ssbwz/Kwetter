using profile_service.model.Models;
using profile_service.model.Repositories;
using profile_service.model.Services;

namespace profile_service.logic.Services
{
    public class ProfileService : IProfileService
    {
        private readonly IProfileRepository _profileRepository;
        public ProfileService(IProfileRepository profileRepository)
        {
            this._profileRepository = profileRepository;
        }

        public Profile GetProfileByEmail(string email)
        {
            return _profileRepository.GetProfileByEmail(email);
        }

        public void UpdateProfile(Profile profile)
        {
            _profileRepository.UpdateProfile(profile);
        }
    }
}
