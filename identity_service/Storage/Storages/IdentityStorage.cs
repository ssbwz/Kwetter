using Microsoft.EntityFrameworkCore;
using Models.Exceptions;
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

        public Identity SaveIdentity(Identity newIdentity)
        {
            try
            {
                Identity identity;
                using (context)
                {
                    identity = context.Identities.Add(newIdentity).Entity;
                    context.SaveChanges();
                }
                return identity;
            }
            catch (DbUpdateException ex)
            {
                throw new AssetAlreadyExistException("The user already exist" ,ex);
            }
        }
    }
}
