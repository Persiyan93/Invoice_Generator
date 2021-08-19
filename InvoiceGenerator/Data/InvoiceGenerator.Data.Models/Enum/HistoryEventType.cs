using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Data.Models.Enum
{
    public enum HistoryEventType
    {

        CreateInvoice=1,
        EditInvoice=2,
        OverdueInvoice=3,
        EditArticle=4,
        AddNewArticle=5,
        ArticleDelivery=6

    }
}
