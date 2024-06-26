﻿using Microsoft.EntityFrameworkCore;
using Models.Exceptions;
using Models.Identities;
using Models.Storage_Interfaces;
using Storage.DbContext;
using System.Security.Principal;

namespace Storage.Services
{
    public class IdentityStorage(IdentityContext context) : IIdentityStorage
    {
        public void DeleteIdentity(Identity identity)
        {
            context.Identities.Remove(identity);
            context.SaveChanges();
        }

        public Identity? GetIdentityByEmail(string email)
        {
            return context.Identities.FirstOrDefault(u => u.Email == email);
        }

        public Identity SaveIdentity(Identity newIdentity)
        {
            try
            {
                Identity identity;
                identity = context.Identities.Add(newIdentity).Entity;
                context.SaveChanges();
                return identity;
            }
            catch (DbUpdateException ex)
            {
                throw new AssetAlreadyExistException("The user already exist" ,ex);
            }
        }
    }
}
