namespace Tweet_service.model.Execeptions
{
    public class ValidationExeption : Exception
    {
        public ValidationExeption()
        {
        }

        public ValidationExeption(string message) : base(message)
        {
        }

    }
}
