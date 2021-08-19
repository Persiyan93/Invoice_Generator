using InvoiceGenerator.Data.Models.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Data.Models
{
    public class NotificationToUser
    {
        public NotificationToUser()
        {
            this.Id = Guid.NewGuid().ToString();
        }
        public string Id { get; set; }

        public string  UserId { get; set; }

        public ApplicationUser User { get; set; }

        public string NotificationId { get; set; }

        public Notification Notification { get; set; }

        public NotificationStatus Status { get; set; }
    }
}
