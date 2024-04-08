namespace profile_service.model.Repositories
{
    public interface IMessageBroker
    {
        public void StartListening(string queueName);
    }

}
