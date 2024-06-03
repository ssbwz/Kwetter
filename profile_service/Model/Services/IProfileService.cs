using profile_service.model.Models;

namespace profile_service.model.Services
{
    public interface IProfileService
    {
        Profile GetProfileByEmail(string email);
        Identity GetUserIdentityByEmail(string email);
        void UpdateIdentity(Identity identity);
        void UpdateProfile(Profile profile);
    }
}
