namespace Models.Auth
{
    public class LoginResponse
    {
        public string Token { get; }

        public LoginResponse(string token)
        {
            this.Token = token;
        }
    }
}
