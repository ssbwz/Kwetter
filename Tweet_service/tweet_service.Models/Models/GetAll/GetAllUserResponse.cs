using Tweet_service.model.Entities;

namespace Tweet_service.Models.GetAll
{
    public class GetAllUserResponse
    {
        public List<Tweet> Tweets { get; set; }
        public int Page { get; set; }
        public int Count { get; set; }
    }
}
