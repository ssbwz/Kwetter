namespace Models.Exceptions
{
    public class AssetAlreadyExistException : Exception
    {
        public AssetAlreadyExistException() : base("Asset already exist.")
        {
        }

        public AssetAlreadyExistException(string message) : base(message)
        {
        }

        public AssetAlreadyExistException(string message, Exception innerException) : base(message, innerException)
        {

        }
    }
}
