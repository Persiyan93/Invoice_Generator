using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Data.Models
{
    public class ArticleHistoryEvent:HistoryEvent
    {
        public string ArticleId { get; set; }

        public Article Article { get; set; }

    }
}
