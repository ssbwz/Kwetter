namespace Models.Identities
{
    public class GetIdentityDTO
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string RegisterMethod { get; set; }
        public string Role { get; set; }
    }
}
