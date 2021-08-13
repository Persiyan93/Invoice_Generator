using InvoiceGenerator.Common;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Services.Data;
using InvoiceGenerator.Web.Models;
using InvoiceGenerator.Web.Models.AccessAreas;
using InvoiceGenerator.Web.Models.Identity;
using Microsoft.AspNetCore.Authorization;
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
        private readonly RoleManager<ApplicationRole> roleManager;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IConfiguration configuration;
        private readonly IIdentityService identityService;

        public IdentityController
            (
            RoleManager<ApplicationRole> roleManager,
            UserManager<ApplicationUser> userManager,
            IConfiguration configuration,
            IIdentityService identityService
            )
        {
            this.roleManager = roleManager;
            this.userManager = userManager;
            this.configuration = configuration;
            this.identityService = identityService;
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginInputModel inputModel)
        {

            var user = await userManager.FindByNameAsync(inputModel.UserName);
            var isLocked = userManager.IsLockedOutAsync(user);
            var isPasswordCorrect = await userManager.CheckPasswordAsync(user, inputModel.Password);
            if (user != null && isPasswordCorrect && !isLocked.Result) 
            {

                var userRoles = await userManager.GetRolesAsync(user);
                var companyId = user.CompanyId;

                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name,user.UserName),

                    new Claim("companyId",user.CompanyId),

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

                var userPermissions =await getUserPermissins(user);
             
                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo,
                    permissions=userPermissions

                });
            }
            return Ok(new ResponseViewModel
            {
                Status = "Unsuccessful",
                Message = "Wrong password or username"
            });
            

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


        [HttpGet]
        [Route("GetUserRoles")]
        [Authorize]
        public async Task<IActionResult> GetPermissions()
        {
            var user = await userManager.FindByNameAsync(this.User.Identity.Name);
            if (user==null)
            {
                new ResponseViewModel
                {
                    Status = "Unsuccessful",
                    Message = ErrorMessages.UserNotLoggedIn

                };

            }


            var userPermissions = await getUserPermissins(user);

            return this.Ok(userPermissions);
        }


        private async Task<AccessAreaModel> getUserPermissins(ApplicationUser user)
        {
            var userRoles = await userManager.GetRolesAsync(user);
            var userPermission = new AccessAreaModel();
            foreach (var userRole in userRoles)
            {
                switch (userRole)
                {
                    case GlobalConstants.EmailAccessRole:
                        userPermission.EmailAccess = true;
                        break;
                    case GlobalConstants.InvoiceAccessRole:
                        userPermission.InvoiceAccess = true;
                        break;
                    case GlobalConstants.ProductsAccessRole:
                        userPermission.ProductsAccess = true;
                        break;
                    case GlobalConstants.UsersAccessRole:
                        userPermission.UsersAccess = true;
                        break;
                    default:
                        userPermission.EmailAccess = true;
                        userPermission.InvoiceAccess = true;
                        userPermission.ProductsAccess = true;
                        userPermission.UsersAccess = true;
                        break;
                }

            }
            return userPermission;

        }
       
    }

}



