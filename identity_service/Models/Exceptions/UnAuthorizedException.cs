namespace Models.Exceptions
{
    public class UnAuthorizedException : Exception
    {
        public UnAuthorizedException() : base("You are unauthorized.")
        {
        }

        public UnAuthorizedException(string message) : base(message)
        {
        }
    }
}
