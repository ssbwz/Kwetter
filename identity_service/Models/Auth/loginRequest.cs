using System.ComponentModel.DataAnnotations;

namespace Models.Auth
{
    public class LoginRequest
    {
        private string email;

        [Required]
        public string Email { get { return email; } set { email = value.ToLower(); } }
        [Required]
        public string Password { get; set; }
    }
}
