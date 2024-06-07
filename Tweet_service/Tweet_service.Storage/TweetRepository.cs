using Tweet_service.model.Entities;
using Tweet_service.model.Repositories;
using Tweet_service.Models.GetAll;
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

        public List<Tweet> GetMyTweets(TweetsFilter tweetFilter)
        {
            int pageSize = 10;
            int itemsToSkip = (tweetFilter.Page - 1) * pageSize;
            List<Tweet> tweets = new List<Tweet>();


            if (!tweetFilter.IsEighteenPlus)
            {
                tweets = context.Tweets
               .Where(e => e.PublisherEmail == tweetFilter.UserEmail && e.IsEighteenPlus == tweetFilter.IsEighteenPlus)
               .Skip(itemsToSkip)
               .Take(pageSize)
               .ToList();
            }
            else
            {
                tweets = context.Tweets
                .Where(e => e.PublisherEmail == tweetFilter.UserEmail)
                .Skip(itemsToSkip)
                .Take(pageSize)
                .ToList();
            }

            return tweets;


        }

        public int GetMyTweetsCount(TweetsFilter tweetFilter)
        {
            if (!tweetFilter.IsEighteenPlus)
            {
                return context.Tweets
                     .Where(e => e.PublisherEmail == tweetFilter.UserEmail && e.IsEighteenPlus == tweetFilter.IsEighteenPlus)
                     .Count();
            }
            else
            {
                return context.Tweets
                        .Where(e => e.PublisherEmail == tweetFilter.UserEmail)
                        .Count();
            }
        }
    }
}
