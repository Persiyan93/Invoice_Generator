using InvoiceGenerator.Common;
using InvoiceGenerator.Common.Resources;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Services.Data;
using InvoiceGenerator.Services.MicrosoftWordService;
using InvoiceGenerator.Web.Models;
using InvoiceGenerator.Web.Models.AccessAreas;
using InvoiceGenerator.Web.Models.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Localization;
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
        private readonly IStringLocalizer<Messages> stringLocalizer;

        public IdentityController
            (
            RoleManager<ApplicationRole> roleManager,
            UserManager<ApplicationUser> userManager,
            IConfiguration configuration,
            IIdentityService identityService,
            IStringLocalizer<Messages> stringLocalizer

            )
        {
            this.roleManager = roleManager;
            this.userManager = userManager;
            this.configuration = configuration;
            this.identityService = identityService;
            this.stringLocalizer = stringLocalizer;
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


                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name,user.UserName),

                    new Claim(ClaimTypes.NameIdentifier,user.Id),

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

                var userPermissions = await GetUserPermissins(user);

                var resultToken = new JwtSecurityTokenHandler().WriteToken(token);
                this.HttpContext.Response
                    .Cookies
                    .Append(
                            "auth",
                            resultToken,
                            new CookieOptions
                            {
                                HttpOnly = true,
                                SameSite = SameSiteMode.None,
                                Secure = true,
                                Expires = token.ValidTo,
                                Path = "/"

                            });

                this.HttpContext.Response.Cookies.Append(".AspNetCore.Culture", "c=bg|uic=bg", new CookieOptions
                {
                    SameSite = SameSiteMode.None,
                    Secure = true,
                });


                return Ok(new { Status = "Successfully", permissions = userPermissions });


            }
            return this.BadRequest(new ResponseViewModel
            {
                Status = "Unsuccessful",
                Message = stringLocalizer["WrnongPasswordOrUserName"].Value
            });


        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register(RegisterInputModel inputModel)
        {
            var response = new ResponseViewModel();
            await identityService.RegisterUserAsync(inputModel);

            response.Status = "Successfully";
            response.Message = stringLocalizer["SuccessfullyRegisteredUser"];

            return this.Ok(response);
        }

        [HttpPost]
        [Authorize]
        [Route("Logout")]
        public IActionResult Logout()
        {
            this.HttpContext.Response.Cookies.Delete(
                           "auth",
                           new CookieOptions
                           {
                               HttpOnly = true,
                               SameSite = SameSiteMode.None,
                               Secure = true,
                               Path = "/"

                           });
            return this.Ok(new ResponseViewModel { Status = "Successfully", Message = "Test" });
        }



        private async Task<UserAccessModel> GetUserPermissins(ApplicationUser user)
        {
            var userRoles = await userManager.GetRolesAsync(user);
            var userPermission = new UserAccessModel();
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



