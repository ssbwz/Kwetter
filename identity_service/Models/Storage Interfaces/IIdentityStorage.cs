using Models.Identities;

namespace Models.Storage_Interfaces
{
    public interface IIdentityStorage
    {
        void DeleteIdentity(Identity identity);
        Identity? GetIdentityByEmail(string email);
        Identity SaveIdentity(Identity newIdentity);
    }
}
