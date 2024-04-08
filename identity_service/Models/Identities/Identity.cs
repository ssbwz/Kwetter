using System.ComponentModel.DataAnnotations;

namespace Models.Identities
{
    public class Identity
    {
 
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string RegisterMethod { get; set; }
        public string Role { get; set; }
    }
}
