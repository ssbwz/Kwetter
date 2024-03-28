using profile_service.model.Models;

namespace profile_service.model.Repositories
{
    public interface IProfileRepository
    {
        public Task<Profile> GetProfileAsync(int id);
    }
}
