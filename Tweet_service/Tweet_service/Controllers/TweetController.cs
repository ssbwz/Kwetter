using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Principal;
using Tweet_service.model.Entities;
using Tweet_service.model.Execeptions;
using Tweet_service.model.GetAll;
using Tweet_service.model.Services;
using Tweet_service.Models.CreateATweet;
using Tweet_service.Models.GetAll;

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
                    PublisherEmail = "user@gmail.com",//decodedToken.Claims.FirstOrDefault(c => c.Type == "Email")?.Value,
                    TextContent = req.TextContent,
                    IsEighteenPlus = req.IsEighteenPlus,
                };

                var res = tweetService.CreateTweet(tweet);
                return CreatedAtAction(nameof(Create), new { id = res.Id }, res);
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }


        [HttpGet]
        [Route("me")]
        public async Task<IActionResult> GetAll([FromQuery] GetAllUserRequest req)
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
                
                TweetsFilter tweetFilter = new TweetsFilter()
                {
                    Page = req.Page,
                    UserEmail = "user@gmail.com",// decodedToken.Claims.FirstOrDefault(c => c.Type == "Email")?.Value
                };

                GetAllUserResponse res = await tweetService.GetMyTweets(tweetFilter);
                return Ok(res);
            }
            catch (BrokerException)
            {
                return StatusCode(500,"Please try again.");
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }

    }
}
