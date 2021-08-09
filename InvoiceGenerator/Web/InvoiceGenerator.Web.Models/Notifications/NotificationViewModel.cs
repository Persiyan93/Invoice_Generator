using InvoiceGenerator.Data.Models.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.Notifications
{
    public class NotificationViewModel
    {
        public string Id { get; set; }

        public NotificationType Type { get; set; }

        public string Message { get; set; }

        public DateTime Date { get; set; }
    }
}
