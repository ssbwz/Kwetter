using Tweet_service.model.Entities;
using Tweet_service.model.Repositories;
using Tweet_service.storage.DBContext;

namespace Tweet_service.storage
{
    public class TweetRepository(TweetContext context) : ITweetRepository
    {
        public Tweet CreateTweet(Tweet tweet)
        {
            tweet = context.Tweets.Add(tweet).Entity;
            context.SaveChanges();
            return tweet;
        }

        public void DeletePublisher(string email)
        {
            var tweetsToDelete = context.Tweets.Where(e => e.PublisherEmail == email).ToList();
            context.Tweets.RemoveRange(tweetsToDelete);
            context.SaveChanges();
        }
    }
}
