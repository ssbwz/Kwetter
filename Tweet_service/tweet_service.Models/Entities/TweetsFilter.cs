namespace Tweet_service.model.Entities
{
    public class TweetsFilter
    {
        public int Page { get; set; } = 1;
        public string UserEmail { get; set; }
        public bool IsEighteenPlus { get; set; }
    }
}
