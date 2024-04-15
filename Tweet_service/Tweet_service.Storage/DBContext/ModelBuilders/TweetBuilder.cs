using Microsoft.EntityFrameworkCore;
using Tweet_service.model.Entities;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Tweet_service.storage.DBContext.ModelBuilders
{
    internal class TweetBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            var model = modelBuilder.Entity<Tweet>();

            model.HasIndex(x => x.Id)
                .IsUnique();

            model.Property(x => x.PublisherEmail)
                .IsRequired();

            model.Property(x => x.TextContent)
                .HasMaxLength(150)
                .IsRequired();
        }
    }
}
