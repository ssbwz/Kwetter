using Models.Identities;

namespace Models.Services_Interfaces
{
    public interface IIdentityService
    {
        Identity CreateIdentity(Identity newIdentity);
    }
}
