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
       

        public IdentityController(UserManager<ApplicationUser> userManager,IConfiguration configuration)
        {
            this.userManager = userManager;
            this.configuration = configuration;
            
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
                if (companyId!=null)
                {
                    authClaims.Add(new Claim("CompanyId", companyId));
                }
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
            var user = await userManager.FindByEmailAsync(inputModel.Email);
            if (user != null)
            {
                response.Status = "Unsuccessful";
                response.Message = string.Format( ErrorMessages.UserAlreadyExist,inputModel.Email);
                
            }
            else
            {
                user = new ApplicationUser
                {
                    Email = inputModel.Email,
                    UserName = inputModel.UserName,
                    Name = inputModel.UserName
                };
               var result= await userManager.CreateAsync(user, inputModel.Password);
                if (result.Succeeded)
                {
                    response.Status = "Successfully";
                    response.Message = string.Format(SuccessMessages.SuccessfullyAddedUser,inputModel.Email);
                }
                else
                {
                    response.Status = "Unsuccessful";
                    response.Message = result.Errors.First().Description;
                }
            }
            return this.Ok(response);
        }
    }
            
}

