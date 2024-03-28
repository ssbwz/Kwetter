using Microsoft.AspNetCore.Mvc;
using profile_service.model.Models;
using profile_service.model.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace profile_service.Controllers
{
    [Route("api/1v/[controller]")]
    [ApiController]
    public class ProfileController(IProfileService profileService) : ControllerBase
    {
        
        [HttpGet("{id}")]
        public Profile Get(int id)
        {
            return profileService.GetProfileAsync(id).Result;
        }
    }
}
