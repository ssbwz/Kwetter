namespace Profile_service.message_broker
{
    public class BrokerException : Exception
    {
        public BrokerException()
        {
        }

        public BrokerException(string message) : base(message)
        {

        }

        public BrokerException(string message, Exception exception) : base(message, exception)
        {

        }
    }
}
