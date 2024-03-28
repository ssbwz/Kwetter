using Microsoft.AspNetCore.Mvc;
using Models.Auth;
using Models.Exceptions;
using Models.Services_Interfaces;

namespace identity_service.Controllers
{
    [ApiController]
    [Route("api/1v/auth")]
    public class AuthorizationController : ControllerBase
    {
        private readonly IAuthorizationService authorizationService;

        public AuthorizationController(IAuthorizationService authorizationService)
        {
            this.authorizationService = authorizationService;
        }

        [HttpPost]
        [Route("login")]
        public IActionResult Login([FromBody] LoginRequest req)
        {
            try
            {
                LoginResponse loginResponse = authorizationService.Login(req);
                return Ok(loginResponse);
            }
            catch (AssetNotFoundException)
            {
                return Unauthorized();
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }
    }
}
