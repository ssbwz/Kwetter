using profile_service.model.Models;

namespace profile_service.model.Services
{
    public interface IProfileService
    {
        Task<Profile> GetProfileAsync(int id);
    }
}
