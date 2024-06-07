using Tweet_service.model.Entities;
using Tweet_service.model.GetAll;
using Tweet_service.Models.GetAll;

namespace Tweet_service.model.Services
{
    public interface ITweetService
    {
        public Tweet CreateTweet(Tweet tweet);
        public Task<GetAllUserResponse> GetMyTweets(TweetsFilter tweetFilter);
    }
}
