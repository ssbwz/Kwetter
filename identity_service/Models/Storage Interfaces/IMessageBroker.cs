namespace Models.Storage_Interfaces
{
    public interface IMessageBroker
    {
        void SendMessage(string email, string queueName);
    }
}
