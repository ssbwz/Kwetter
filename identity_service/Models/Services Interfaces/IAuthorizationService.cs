using Models.Auth;

namespace Models.Services_Interfaces
{
    public interface IAuthorizationService
    {
        LoginResponse Login(LoginRequest request);
    }
}
