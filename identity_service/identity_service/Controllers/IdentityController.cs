﻿using Microsoft.AspNetCore.Mvc;
using Models.Auth;
using Models.Exceptions;
using Models.Identities;
using Models.Services_Interfaces;
using System.IdentityModel.Tokens.Jwt;

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
                Identity newIdentity = new Identity()
                {
                    Email = req.Email.ToLower(),
                    HashedPassword = req.Password,
                    Birthdate = req.Birthdate,
                    RegisterMethod = "Website",
                    Role = "User",
                    UserLoginAttempt = new UserLoginAttempt()
                    {
                        AttemptsCount = 0
                    }
                };


                newIdentity = identityService.CreateIdentity(newIdentity);
                int Id = newIdentity.Id;
                return CreatedAtAction(nameof(Create), new { Id }, new { Id }); ;
            }
            catch (AssetAlreadyExistException)
            {
                return BadRequest("The email is already is been used.");
            }
            catch (BrokerException)
            {
                return StatusCode(502);
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }


        [HttpDelete("{email}")]
        public IActionResult Delete(string email)
        {
            try
            {

                identityService.DeleteIdentity(email.ToLower());
                return NoContent();
            }
            catch (BrokerException)
            {
                return StatusCode(502);
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }


        [HttpDelete("me")]
        public IActionResult Delete()
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
                var email = decodedToken.Claims.FirstOrDefault(c => c.Type == "Email")?.Value;

                identityService.DeleteIdentity(email.ToLower());
                return NoContent();
            }
            catch (BrokerException)
            {
                return StatusCode(502);
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }



        [HttpGet("{pageNumber}")]
        public IActionResult GetAll(int pageNumber)
        {
            try
            {

                GetIdentitiesResponse res = new GetIdentitiesResponse()
                {
                    Identities = identityService.GetAllIdentity(pageNumber)
                };

                return Ok(res);
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
