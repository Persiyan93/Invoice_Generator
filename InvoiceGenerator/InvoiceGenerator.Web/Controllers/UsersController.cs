using InvoiceGenerator.Common;
using InvoiceGenerator.Common.Resources;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Data.Models.Enum;
using InvoiceGenerator.Services.Data;
using InvoiceGenerator.Services.Messaging;
using InvoiceGenerator.Web.Models;
using InvoiceGenerator.Web.Models.AccessAreas;
using InvoiceGenerator.Web.Models.Identity;
using InvoiceGenerator.Web.Models.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Localization;
using System;
using System.Linq;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService userService;
        private readonly IEmailSender emailSender;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IStringLocalizer<Messages> stringLocalizer;

        public UsersController(IUserService userService, UserManager<ApplicationUser> userManager,
                                IEmailSender emailSender, IStringLocalizer<Messages> stringLocalizer)
        {
            this.userService = userService;
            this.userManager = userManager;
            this.emailSender = emailSender;
            this.stringLocalizer = stringLocalizer;
        }
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateUser(UserModel inputModel)
        {
            var user = await userManager.FindByEmailAsync(inputModel.Email);
            if (user != null)
            {
                throw new InvalidUserDataException(stringLocalizer["EmailAdressAlreadyUsed", inputModel.Email].Value);
            }
         
            user = await userManager.FindByNameAsync(inputModel.UserName);
            if (user != null)
            {
                throw new InvalidUserDataException(stringLocalizer["UserNameAlreadyUsed", inputModel.UserName].Value);
            }
            var currentUser = await userManager.FindByNameAsync(this.User.Identity.Name);
            var companyId = currentUser.CompanyId;


            user = new ApplicationUser
            {
                UserName = inputModel.UserName,
                Email = inputModel.Email,
                Name = inputModel.FullName,
                CompanyId = companyId,
                Status = UserStatus.Active
            };
            await userManager.CreateAsync(user);
            user = await userManager.FindByEmailAsync(inputModel.Email);

            if (inputModel.AccessAreas.EmailAccess)
            {
                await userManager.AddToRoleAsync(user, GlobalConstants.EmailAccessRole);
            }
            if (inputModel.AccessAreas.InvoiceAccess)
            {
                await userManager.AddToRoleAsync(user, GlobalConstants.InvoiceAccessRole);
            }
            if (inputModel.AccessAreas.ProductsAccess)
            {
                await userManager.AddToRoleAsync(user, GlobalConstants.ProductsAccessRole);
            }
            if (inputModel.AccessAreas.UsersAccess)
            {
                await userManager.AddToRoleAsync(user, GlobalConstants.UsersAccessRole);
            }

            var token = await userManager.GeneratePasswordResetTokenAsync(user);
            var code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));
            var emailAsByteArray = System.Text.Encoding.UTF8.GetBytes(user.Email);
            var email = System.Convert.ToBase64String(emailAsByteArray);
            
            var url = $"{HttpContext.Request.Host.Value}/Users/NewPassword/{email}/{code}";
            //string message = $"<p>Моля посетете линка за да въведете вашата нова парола:</p><a href='{HtmlEncoder.Default.Encode(url)}'>Linktiltest</a><p>just a test</p>";
            var message = stringLocalizer["EmailAfrerSuccessfullyRegisteredUser", HtmlEncoder.Default.Encode(url)].Value;
            await emailSender.SendEmailAsync(inputModel.Email, "Invoice generator", message);


            return this.Ok(new ResponseViewModel
            {
                Status = "Successful",
                Message = stringLocalizer["SuccessfullyAddedUser", inputModel.UserName].Value
            });




        }

        [HttpPut("{userId}")]
        public async Task<IActionResult> ChangeUserStatus(UpdateUserStatusModel input)
        {
            var userName = await userService.ChangeUserStatusAsync(input);
            return this.Ok(new ResponseViewModel
            {
                Status = "Successful",
                Message = stringLocalizer["SuccessfullyUpdatedUser", userName]
            }); ;
        }

        [HttpPut]
        [Route("UpdateUserAccess/{userId}")]
        public async Task<IActionResult> UpdateUserAccess(UserAccessModel input, string userId)
        {

            var userName = await userService.UpdateUserAccessAsync(input, userId);
            return this.Ok(new ResponseViewModel
            {
                Status = "Successful",
                Message = stringLocalizer["SuccessfullyUpdatedUserAccess", userName]
            });
        }

        [HttpPost]
        [Route("NewPassword")]
        public async Task<IActionResult> SetNewPassword(NewPasswordInputModel inputModel)
        {
            var emailToByteArray = Convert.FromBase64String(inputModel.Email);
            var tokenValueBytes = Convert.FromBase64String(inputModel.Token);
            var tokenToString = Encoding.UTF8.GetString(tokenValueBytes);

            var emailToString = Encoding.UTF8.GetString(emailToByteArray);

            var user = await userManager.FindByEmailAsync(emailToString);
            await userManager.ResetPasswordAsync(user, tokenToString, inputModel.Password);

            return this.Ok(new ResponseViewModel
            {
                Status = "Successful",
                Message = stringLocalizer["SuccessfullySavedPassword"]
            });
        }



        [HttpGet]
        public async Task<IActionResult> GetAllUsers(DateTime startDate, DateTime endDate,
                    string orderBy = "FullName", string order = "asc", int page = 1, int rowsPerPage = 10, string filterString = "")
        {
            var companyId = this.User.Claims.FirstOrDefault(x => x.Type == "companyId").Value;
            var users = await userService.GetAllUsersAsync(companyId, startDate, endDate,
             orderBy, order, page, rowsPerPage, filterString);

            return this.Ok(users);

        }


        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserInfo(string userId)
        {
            var userInfo = await userService.GetUserInfoAsync(userId);
            return this.Ok(userInfo);
        }

        [HttpGet]
        [Route("GetUserInfo")]
        public async Task<IActionResult> GetPermissions()

        {
            var user = await userManager.GetUserAsync(this.User);
            if (user == null)
            {
                return this.Unauthorized(new ResponseViewModel
                {
                    Status = "Unsuccessful",
                    Message = "Not authorized"

                });

            }

            var userPermissions = await userService.GetUserInfoAsync(user.Id);

            return this.Ok(userPermissions);
        }

    }
}
