using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Common
{
    public static class NotificationMessages
    {
        public const string InvoiceisOverdue = "Invoice with number {0} is overdue"; 
        public const string ArticleQuantityUnderLimt = "Article {0} with Article number:{1} quantity has fallen under limit"; 
    }
}
