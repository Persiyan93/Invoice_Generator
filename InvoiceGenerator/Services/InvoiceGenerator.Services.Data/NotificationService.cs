using InvoiceGenerator.Common;
using InvoiceGenerator.Data;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Data.Models.Enum;
using InvoiceGenerator.Services.Mapping;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Services.Data
{
    public class NotificationService : INotificationService
    {
        private readonly ApplicationDbContext context;

        public NotificationService(ApplicationDbContext context)
        {
            this.context = context;
        }



        public async Task<ICollection<T>> GetUnReadNotificationsAsync<T>(string userId)
        {
            var notifications = await context.Notifications
                .Where(n => n.ReadFromCollection.All(u => u.UserId != userId))
                .To<T>()
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
