using Microsoft.EntityFrameworkCore;
using Models.Identities;
using Storage.DbContext.ModelsBuilders;

namespace Storage.DbContext
{
    public class IdentityContext(DbContextOptions<IdentityContext> options) : Microsoft.EntityFrameworkCore.DbContext(options)
    {
        public DbSet<Identity> Identities { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            IdentityBuilder.Build(modelBuilder);
        }
    }

}
