namespace profile_service.Models.Profiles
{
    public class UpdateProfileRequest
    {
        public string? Name { get; set; }
        public string? Bio { get; set; }
        public string ProfileImage { get; set; }
    }
}
