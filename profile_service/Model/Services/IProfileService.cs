using profile_service.model.Models;

namespace profile_service.model.Services
{
    public interface IProfileService
    {
        Profile GetProfileByEmail(string email);
        void UpdateProfile(Profile profile);
    }
}
