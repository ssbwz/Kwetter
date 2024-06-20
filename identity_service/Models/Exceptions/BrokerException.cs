namespace Models.Exceptions
{
    public class BrokerException : Exception
    {
        public BrokerException() : base("Messaging broker Exception")
        {
        }

        public BrokerException(string message) : base(message)
        {
        }

        public BrokerException(string message, Exception innerException) : base(message, innerException)
        {

        }
    }
}
