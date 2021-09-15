using InvoiceGenerator.Common;
using InvoiceGenerator.Common.Resources;
using InvoiceGenerator.Data;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Data.Models.Enum;
using InvoiceGenerator.Services.Mapping;
using InvoiceGenerator.Web.Models.Notifications;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace InvoiceGenerator.Services.Data
{
    public class NotificationService : INotificationService
    {
        private readonly ApplicationDbContext context;
        private readonly IStringLocalizer stringLocalizer;

        public NotificationService(ApplicationDbContext context,IStringLocalizer<Messages> stringLocalizer)
        {
            this.context = context;
            this.stringLocalizer = stringLocalizer;
        }



        public async Task<ICollection<NotificationViewModel>> GetUnReadNotificationsAsync(string userId)
        {
            var currentCulture = Thread.CurrentThread.CurrentCulture.Name;
            var notifications = await context.Notifications
                .Where(n => n.ReadFromCollection.All(u => u.UserId != userId)&&n.Company.Users.Any(x=>x.Id==userId))
                .Select(x=>new NotificationViewModel
                {
                    Id=x.NotificationId,
                    Date=x.Date.ToString("dd.M"),
                    Type = stringLocalizer[x.Type.ToString()],
                    Message=currentCulture=="bg"?x.BulgarianMessage:x.Message
                })
                .ToListAsync();

            return notifications;
        }

        public async  Task MarkAsReadAsync(string userId, string companyId, string notificationId)
        {
            var notification =await  context.Notifications
                .FirstOrDefaultAsync(x => x.NotificationId==notificationId
                                            &&x.CompanyId==companyId
                                            &&x.ReadFromCollection.All(r=>r.UserId!=userId));
            if (notification==null)
            {
                throw new InvalidUserDataException(string.Format(ErrorMessages.InvalidNotificationId, notificationId));
            }
            var userToNotification = new NotificationToUser
            {
                UserId = userId,
                NotificationId = notification.NotificationId,
                Status = NotificationStatus.Read
            };
            
            notification.ReadFromCollection.Add(userToNotification);
           await context.SaveChangesAsync();
        }
    }
}
