using profile_service.model.Models;
using profile_service.model.Repositories;

namespace profile_service.storage.Repositories
{
    public class ProfileRepository : IProfileRepository
    {
        private List<Profile> _profiles = new List<Profile>() {
        new Profile(){
        Id=1,
        Name= "John",
        Description= "Desc"
        },
        new Profile(){
        Id=2,
        Name= "Eduard",
        Description= "Eduard Desc"
        },
        new Profile(){
        Id=3,
        Name= "Habibi",
        Description= "Hbb Desc"
        }
        };

        public Task<Profile> GetProfileAsync(int id)
        {
            foreach (var profile in _profiles)
            {
                if (profile.Id == id)
                {
                    return Task.FromResult(profile);
                }
            }
            return null;
        }
    }
}
