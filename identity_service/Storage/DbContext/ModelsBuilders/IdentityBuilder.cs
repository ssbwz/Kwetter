using Microsoft.EntityFrameworkCore;
using Models.Auth;
using Models.Identities;
using System.Reflection.Emit;

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

            model.Property(x => x.HashedPassword)
                .IsRequired();

            model.Property(x => x.RegisterMethod)
                .IsRequired();

            model.Property(x => x.Role)
                 .IsRequired();

            modelBuilder.Entity<Identity>()
            .HasOne(u => u.UserLoginAttempt)
            .WithOne(up => up.Identity)
            .HasForeignKey<UserLoginAttempt>(up => up.UserId)
            .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<UserLoginAttempt>()
            .HasIndex(o => o.Id)
            .IsUnique();

            modelBuilder.Entity<UserLoginAttempt>()
            .Property(o => o.AttemptsCount)
            .IsRequired();
        }
    }

}
