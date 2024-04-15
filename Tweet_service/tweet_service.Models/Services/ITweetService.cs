using Tweet_service.model.Entities;

namespace Tweet_service.model.Services
{
    public interface ITweetService
    {
        public Tweet CreateTweet(Tweet tweet);
    }
}
