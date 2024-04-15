using Tweet_service.model.Entities;
using Tweet_service.model.Repositories;
using Tweet_service.model.Services;

namespace Tweet_service.service
{
    public class TweetService(ITweetRepository tweetRepository) : ITweetService
    {
        public Tweet CreateTweet(Tweet tweet)
        {
            return tweetRepository.CreateTweet(tweet);
        }
    }
}
