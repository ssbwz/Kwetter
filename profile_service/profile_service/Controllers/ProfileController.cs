using Microsoft.AspNetCore.Mvc;
using profile_service.model.Models;
using profile_service.model.Services;
using profile_service.Models.Profiles;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Principal;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace profile_service.Controllers
{
    [Route("api/1v/[controller]")]
    [ApiController]
    public class ProfileController(IProfileService profileService) : ControllerBase
    {

        [HttpGet("{email}")]
        public IActionResult Get(string email)
        {
            Profile profile = profileService.GetProfileByEmail(email);
            if (profile == null)
            {
                return NotFound();
            }

            return Ok(profile);

        }

        [HttpPut]
        public async Task<ActionResult> Update(UpdateProfileRequest req)
        {
            try
            {
                string authorizationHeader = Request.Headers["Authorization"];
                if (string.IsNullOrEmpty(authorizationHeader) || !authorizationHeader.StartsWith("Bearer "))
                {
                    return BadRequest("Invalid or missing Authorization header");
                }
                string token = authorizationHeader.Substring("Bearer ".Length).Trim();

                var tokenHandler = new JwtSecurityTokenHandler();
                var decodedToken = tokenHandler.ReadJwtToken(token);


                Profile profile = new Profile()
                {
                    Email = decodedToken.Claims.FirstOrDefault(c => c.Type == "Email")?.Value,
                    ProfileImage = Convert.FromBase64String(req.ProfileImage),
                    Name = req.Name,
                    Bio = req.Bio
                };


                profileService.UpdateProfile(profile);
                return NoContent();
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }
    }
}
