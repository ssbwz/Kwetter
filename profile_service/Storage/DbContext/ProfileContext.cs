using Microsoft.EntityFrameworkCore;
using profile_service.model.Models;
using profile_service.storage.DbContext.ModelsBuilders;
using System.Security.Principal;

namespace profile_service.storage.DbContext
{
    public class ProfileContext(DbContextOptions<ProfileContext> options) : Microsoft.EntityFrameworkCore.DbContext(options)
    {
        // docker run --name profile-service-db -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -e POSTGRES_DB=profileservice -d -p 5432:5432 postgres
        public DbSet<Profile> Profiles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            ProfileBuilder.Build(modelBuilder);
        }
    }
}
