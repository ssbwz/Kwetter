using Models.Identities;
using Models.Storage_Interfaces;
using Storage.DbContext;

namespace Storage.Services
{
    public class IdentityStorage(IdentityContext context) : IIdentityStorage
    {
        public Identity? GetIdentityByEmail(string email)
        {
            using (context)
            {
                return context.Identities.FirstOrDefault(u => u.Email == email);
            }
        }
    }
}
