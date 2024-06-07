using Tweet_service.model.Entities;

namespace Tweet_service.model.Repositories
{
    public interface ITweetRepository
    {
        public void DeletePublisher(string email);
        public Tweet CreateTweet(Tweet tweet);
        public List<Tweet> GetMyTweets(TweetsFilter tweetFilter);
        int GetMyTweetsCount(TweetsFilter tweetFilter);
    }
}
