using profile_service.model.Models;
using profile_service.model.Repositories;
using profile_service.model.Services;

namespace profile_service.logic.Services
{
    public class ProfileService(IProfileRepository _profileRepository) : IProfileService
    {
        public Task<Profile> GetProfileAsync(int id)
        {
            return _profileRepository.GetProfileAsync(id);
        }
    }
}
