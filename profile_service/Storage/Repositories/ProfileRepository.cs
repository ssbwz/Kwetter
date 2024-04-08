using profile_service.model.Models;
using profile_service.model.Repositories;
using profile_service.storage.DbContext;


namespace profile_service.storage.Repositories
{
    public class ProfileRepository(ProfileContext context) : IProfileRepository
    {
        public Profile CreateProfile(Profile newProfile)
        {
            Profile profile;
            using (context)
            {
               profile = context.Profiles.Add(newProfile).Entity;
               context.SaveChanges();
            }
            return profile;
        }

        public Profile GetProfileByEmail(string email)
        {
            using (context)
            {
                return context.Profiles.FirstOrDefault(u => u.Email == email);
            }
        }

        public void UpdateProfile(Profile updatedProfile)
        {
            using (context)
            {
                Profile profile = context.Profiles.FirstOrDefault(u => u.Email == updatedProfile.Email);
                profile.Name = updatedProfile.Name;
                profile.Bio = updatedProfile.Bio;
                profile.ProfileImage = updatedProfile.ProfileImage;
                context.SaveChanges();
            }
        }
    }
}
