using InvoiceGenerator.Common;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Services.Data;
using InvoiceGenerator.Web.Models;
using InvoiceGenerator.Web.Models.Notifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace InvoiceGenerator.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class NotificationsController : ControllerBase
    {
        private readonly INotificationService notificationService;
        private readonly UserManager<ApplicationUser> userManager;

        public NotificationsController(INotificationService notificationService,UserManager<ApplicationUser> userManager)
        {
            this.notificationService = notificationService;
            this.userManager = userManager;
        }
        [HttpGet]
        [Route("Unread")]
        public async Task<IActionResult> GetUnreadNotification()
        {
            var user = await userManager.GetUserAsync(this.User);
            var notifications = await notificationService.GetUnReadNotificationsAsync(user.Id);

            return this.Ok(notifications);
        }

        [HttpPut("{notificationId}")]
         public async Task<IActionResult> MarkAsRead(string notificationId)
        {
            var user = await userManager.FindByNameAsync(this.User.Identity.Name);
             await notificationService.MarkAsReadAsync(user.Id,user.CompanyId,notificationId);

            return this.Ok(new ResponseViewModel
            {
                Status = SuccessMessages.SuccessfullyStatus,
            });
        }



    }
}
