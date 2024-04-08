using Microsoft.AspNetCore.Mvc;
using Models.Auth;
using Models.Exceptions;
using Models.Identities;
using Models.Services_Interfaces;

namespace identity_service.Controllers
{
    [ApiController]
    [Route("api/1v/identites")]
    public class IdentityController : ControllerBase
    {
        private readonly IIdentityService identityService;

        public IdentityController(IIdentityService identityService)
        {
            this.identityService = identityService;
        }

        [HttpPost]
        public IActionResult Create([FromBody] RegisterIdentityRequest req)
        {
            try
            {
                Identity newIdentity = new Identity() { 
                Email = req.Email.ToLower(),
                Password = req.Password,
                RegisterMethod = "Website",
                Role = "User"
                };
                

                newIdentity = identityService.CreateIdentity(newIdentity);
                int Id = newIdentity.Id; 
                return  CreatedAtAction(nameof(Create), new { Id }, new { Id });;
            }
            catch (AssetAlreadyExistException)
            {
                return BadRequest("The email is already is been used.");
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }
    }
}
