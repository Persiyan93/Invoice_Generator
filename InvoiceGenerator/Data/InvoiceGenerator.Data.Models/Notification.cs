using InvoiceGenerator.Data.Models.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Data.Models
{
    public class Notification
    {
        public Notification()
        {
            this.Id = Guid.NewGuid().ToString();
            this.ReadFromCollection = new HashSet<ApplicationUser>();
        }
        public string Id { get; set; }

        public string InvoiceId{ get; set; }

        public Invoice Invoice { get; set; }

        public NotificationType Type { get; set; }

        public string Message { get; set; }

        public DateTime Date { get; set; }

        public ICollection<ApplicationUser> ReadFromCollection { get; set; }


    }
}
