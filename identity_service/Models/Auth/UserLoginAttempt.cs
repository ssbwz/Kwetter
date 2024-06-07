using Models.Identities;

namespace Models.Auth
{
    public class UserLoginAttempt
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int AttemptsCount { get; set; }

        public Identity Identity { get; set; }
    }
}
