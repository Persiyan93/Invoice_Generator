using InvoiceGenerator.Common;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Services.Data;
using InvoiceGenerator.Web.Models;
using InvoiceGenerator.Web.Models.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IdentityController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IConfiguration configuration;
        private readonly IIdentityService identityService;

        public IdentityController
            (
            UserManager<ApplicationUser> userManager,
            IConfiguration configuration,
            IIdentityService identityService
            )
        {
            this.userManager = userManager;
            this.configuration = configuration;
            this.identityService = identityService;
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginInputModel inputModel)
        {

            var user = await userManager.FindByNameAsync(inputModel.UserName);
            if (user != null && await userManager.CheckPasswordAsync(user, inputModel.Password))
            {

                var userRoles = await userManager.GetRolesAsync(user);
                var companyId = user.CompanyId;

                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name,user.UserName),

                    new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),

                };
               
                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                }
                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]));

                var token = new JwtSecurityToken(
                    issuer: configuration["JWT:ValidIssuer"],
                    audience: configuration["JWT:ValidAudience"],
                    expires: DateTime.Now.AddHours(8),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                    );



                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo
                });
            }
            return Unauthorized();

        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register(RegisterInputModel inputModel)
        {
            var response = new ResponseViewModel();
            await identityService.RegisterUserAsync(inputModel);
            response.Status = "Successfully";
            response.Message = string.Format(SuccessMessages.SuccessfullyAddedUser, inputModel.Email);



            return this.Ok(response);
        }
    }

}



