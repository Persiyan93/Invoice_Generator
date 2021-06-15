using InvoiceGenerator.Data.Models.Enum;
using InvoiceGenerator.Web.Models.Articles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.Invoices
{
    public class InvoiceInputModel
    {
        public string CompanyId { get; set; }

        public string ClientId { get; set; }

        public ICollection<ArticleToInvoiceInputModel > Articles { get; set; }

        public DateTime MaturityDate { get; set; }

        public LanguageOfInvoice Language { get; set; }
    }
}
