namespace Models.Exceptions
{
    public class AssetNotFoundException : Exception
    {
        public AssetNotFoundException() : base("Asset not found.")
        {
        }

        public AssetNotFoundException(string message) : base(message)
        {
        }

        public AssetNotFoundException(string message, Exception innerException) : base(message, innerException)
        {

        }
    }

}
