using Microsoft.EntityFrameworkCore;
using Models.Identities;

namespace Storage.DbContext.ModelsBuilders
{
    public class IdentityBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            var model = modelBuilder.Entity<Identity>();

            model.HasIndex(x => x.Id)
                .IsUnique();

            model.Property(x => x.Id)
                .IsRequired();

            model.HasIndex(x => x.Email)
                .IsUnique();

            model.Property(x => x.Password)
                .IsRequired();

            model.Property(x => x.RegisterMethod)
                .IsRequired();

            model.Property(x => x.Role)
                 .IsRequired();
        }
    }

}
