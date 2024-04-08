using profile_service.model.Models;

namespace profile_service.model.Repositories
{
    public interface IProfileRepository
    {
        public Profile CreateProfile(Profile newProfile);
        public Profile GetProfileByEmail(string email);
        void UpdateProfile(Profile updatedProfile);
    }
}
