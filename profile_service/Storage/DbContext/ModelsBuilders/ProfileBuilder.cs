using Microsoft.EntityFrameworkCore;
using profile_service.model.Models;

namespace profile_service.storage.DbContext.ModelsBuilders
{
    internal class ProfileBuilder
    {

        public static void Build(ModelBuilder modelBuilder)
        {
            var model = modelBuilder.Entity<Profile>();

            model.HasIndex(x => x.Id)
                .IsUnique();

            model.Property(x => x.ProfileImage)
                .IsRequired();

            model.Property(x => x.Name)
                .IsRequired();

            model.HasIndex(x => x.Email)
                .IsUnique();

            model.Property(x => x.Bio)
                .IsRequired();
        }
    }
}
