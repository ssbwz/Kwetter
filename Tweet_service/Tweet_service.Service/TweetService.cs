using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Tweet_service.message_broker;
using Tweet_service.model.Entities;
using Tweet_service.model.Execeptions;
using Tweet_service.model.Repositories;
using Tweet_service.model.Services;
using Tweet_service.Models.GetAll;

namespace Tweet_service.service
{
    public class TweetService : ITweetService
    {
        private readonly ITweetRepository tweetRepository;
        private readonly MessageBroker messageBroker;

        public TweetService(ITweetRepository tweetRepository, IConfiguration configuration)
        {
            this.tweetRepository = tweetRepository;
            this.messageBroker = new MessageBroker(configuration);

        }
        public Tweet CreateTweet(Tweet tweet)
        {
            return tweetRepository.CreateTweet(tweet);
        }

        public async Task<GetAllUserResponse> GetMyTweets(TweetsFilter tweetFilter)
        {
            var brokerres = await messageBroker.CallAsync(new BrokerMessage(
                "account_service",
                new { Email = tweetFilter.UserEmail }
                , "get_user"));
            if (brokerres == "null")
            {
                throw new ValidationExeption("The current user is invalid.");
            }
            User user = JsonConvert.DeserializeObject<User>(brokerres);
            DateTime today = DateTime.Today;
            GetAllUserResponse res = new GetAllUserResponse();
            if (today.Year - user.Birthdate.Year < 18)
            {
                tweetFilter.IsEighteenPlus = false;
                res = new GetAllUserResponse()
                {
                    Tweets = tweetRepository.GetMyTweets(tweetFilter),
                    Page = tweetFilter.Page,
                    Count = tweetRepository.GetMyTweetsCount(tweetFilter)
                };
            }
            else
            {
                tweetFilter.IsEighteenPlus = true;
                res = new GetAllUserResponse()
                {
                    Tweets = tweetRepository.GetMyTweets(tweetFilter),
                    Page = tweetFilter.Page,
                    Count = tweetRepository.GetMyTweetsCount(tweetFilter)
                };
            }

            return res;
        }

    }
}
