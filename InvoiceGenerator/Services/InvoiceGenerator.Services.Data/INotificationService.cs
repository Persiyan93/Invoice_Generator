using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Data.Models.Enum;
using InvoiceGenerator.Web.Models.Notifications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Services.Data
{
    public interface INotificationService
    {

      
        public Task<ICollection<NotificationViewModel>> GetUnReadNotificationsAsync(string userId);

        public Task MarkAsReadAsync(string userId, string companyId, string notificationId);


    }
}
