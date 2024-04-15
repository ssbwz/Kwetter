using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Principal;
using Tweet_service.model.Entities;
using Tweet_service.model.Services;
using Tweet_service.Models.CreateATweet;

namespace Tweet_service.Controllers
{
    [Route("api/1v/[controller]")]
    [ApiController]
    public class TweetController(ITweetService tweetService) : ControllerBase
    {

        [HttpPost]
        public async Task<ActionResult> Create(CreateTweetRequest req)
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

                Tweet tweet = new Tweet()
                {
                    PublisherEmail = decodedToken.Claims.FirstOrDefault(c => c.Type == "Email")?.Value,
                    TextContent = req.TextContent
                };

                var res = tweetService.CreateTweet(tweet);
                return CreatedAtAction(nameof(Create), new { id = res.Id }, res);
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }

    }
}
