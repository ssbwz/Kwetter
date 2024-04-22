using Models.Identities;

namespace Models.Services_Interfaces
{
    public interface IIdentityService
    {
        Identity CreateIdentity(Identity newIdentity);
        void DeleteIdentity(string email);
        List<GetIdentityDTO> GetAllIdentity(int pageNumber);
    }
}
