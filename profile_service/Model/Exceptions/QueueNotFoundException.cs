namespace profile_service.model.Exceptions
{
    public class QueueNotFoundException : Exception
    {
        public QueueNotFoundException() : base("Queue not found.")
        {
        }

        public QueueNotFoundException(string message) : base(message)
        {
        }

        public QueueNotFoundException(string message, Exception innerException) : base(message, innerException)
        {

        }
    }
}
