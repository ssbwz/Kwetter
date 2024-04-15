using Microsoft.EntityFrameworkCore;
using Tweet_service.model.Entities;
using Tweet_service.storage.DBContext.ModelBuilders;

namespace Tweet_service.storage.DBContext
{
    public class TweetContext(DbContextOptions<TweetContext> options) : DbContext(options)
    {
        // docker run --name tweet-service-db -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -e POSTGRES_DB=tweetservice -d -p 5432:5432 postgres
        public DbSet<Tweet> Tweets { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            TweetBuilder.Build(modelBuilder);
        }
    }
}
