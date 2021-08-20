using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.Notifications
{
    public class UpdateNotificationModel
    {
        public ICollection<string> NotificationIds { get; set; }
    }
}
