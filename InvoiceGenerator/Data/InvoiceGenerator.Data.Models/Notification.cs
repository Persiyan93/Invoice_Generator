using InvoiceGenerator.Data.Models.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Data.Models
{
    public  class Notification
    {
        public Notification()
        {
            this.NotificationId = Guid.NewGuid().ToString();
            this.ReadFromCollection = new HashSet<NotificationToUser>();
            this.Date = DateTime.UtcNow;
        }
        public string CompanyId { get; set; }

        public RegisteredCompany Company { get; set; }

        public string NotificationId { get; set; }

         public NotificationType Type { get; set; }

        public string Message { get; set; }

        public string BulgarianMessage { get; set; }

        public DateTime Date { get; set; }

        public ICollection<NotificationToUser> ReadFromCollection { get; set; }


    }
}
