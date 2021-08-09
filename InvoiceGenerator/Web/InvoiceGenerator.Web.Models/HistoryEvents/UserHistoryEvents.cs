using InvoiceGenerator.Data.Models.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.HistoryEvents
{
    public class UserHistoryEvents
    {
        public string UserFullName { get; set; }

        public ICollection<HistoryEventModel> InvoiceHistory { get; set; }

        public ICollection<HistoryEventModel> ArticleHistory { get; set; }

    }
}
