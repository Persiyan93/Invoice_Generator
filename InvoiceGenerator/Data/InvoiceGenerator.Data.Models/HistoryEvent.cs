using InvoiceGenerator.Data.Models.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Data.Models
{
    public  class HistoryEvent
    {
        public HistoryEvent()
        {
            this.Id = Guid.NewGuid().ToString();
            this.DateOfEvent = DateTime.UtcNow;
        }
        public string Id { get; set; }

        public DateTime DateOfEvent { get; set; }

        public HistoryEventType EventType { get; set; }

        public string AdditionalText { get; set; }

        public string BulgarianMessage { get; set; }

        public string UserId { get; set; }

        public ApplicationUser User { get; set; }

        public string CompanyId { get; set; }

        public RegisteredCompany Company { get; set; }

    }
}
