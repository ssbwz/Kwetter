using Models.Identities;

namespace Models.Storage_Interfaces
{
    public interface IIdentityStorage
    {
        void DeleteIdentity(Identity identity);
        List<Identity> GetAllIdentity(int pageNumber);
        Identity? GetIdentityByEmail(string email);
        Identity SaveIdentity(Identity newIdentity);

        Identity Update(Identity identity);
    }
}
