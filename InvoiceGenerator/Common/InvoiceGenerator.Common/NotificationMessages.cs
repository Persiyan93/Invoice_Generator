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
        public const string InvoiceisOverdueBG = "Фактура с номер {0} е просрочена"; 
        public const string ArticleQuantityUnderLimt = "Quantity  of article {0} with aticle number:{1} has fallen under limit"; 
        public const string ArticleQuantityUnderLimtBG = "Количеството на aртикул: {0} с артикулен номер:{1} падна под зададената граница  "; 
    }
}
