using Models.Identities;

namespace Models.Storage_Interfaces
{
    public interface IIdentityStorage
    {
        Identity? GetIdentityByEmail(string email);
        Identity SaveIdentity(Identity newIdentity);
    }
}
