namespace Models.Broker
{
    public class UpdateIdentityBrokerRequest
    {
        public string Email { get; set; }
        public DateOnly Birthdate { get; set; }
    }
}
