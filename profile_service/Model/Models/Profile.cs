namespace profile_service.model.Models
{
    public class Profile
    {
        public int? Id { get; set; }
        public byte[] ProfileImage { get; set; }
        public string? Name { get; set; }
        public string Email { get; set; }
        public string? Bio { get; set; }
    }
}
