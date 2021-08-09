using InvoiceGenerator.Data.Models.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.HistoryEvents
{
    public class HistoryEventModel
    {

        public DateTime DateOfEvent { get; set; }

        public string AdditionalText { get; set; }

        public HistoryEventType TypeOfEvent { get; set; }
    }
}
