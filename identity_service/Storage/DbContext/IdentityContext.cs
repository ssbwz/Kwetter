using Microsoft.EntityFrameworkCore;
using Models.Identities;
using Storage.DbContext.ModelsBuilders;

namespace Storage.DbContext
{
    public class IdentityContext(DbContextOptions<IdentityContext> options) : Microsoft.EntityFrameworkCore.DbContext(options)
    {
        // docker run --name identity-service-db -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -e POSTGRES_DB=identityservice -d -p 5433:5432 postgres
        public DbSet<Identity> Identities { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            IdentityBuilder.Build(modelBuilder);
        }
    }

}
