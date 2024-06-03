namespace profile_service.Models.Profiles
{
    public class UpdateProfileRequest
    {
        public string? Name { get; set; }
        public string? Bio { get; set; }
        public DateOnly Birthdate { get; set; }
    }
}
