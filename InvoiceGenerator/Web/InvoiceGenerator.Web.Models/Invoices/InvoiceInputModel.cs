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
        public string SellerId { get; set; }

        public string ClientId { get; set; }

        public  string ContactPersonId { get; set; }

        public DateTime IssueDate { get; set; }

        public TimeSpan?  PaymentTerm { get; set; }

        public ICollection<ArticleToInvoiceInputModel > Articles { get; set; }

        public DateTime DateOfTaxEven { get; set; }

        public MethodsOfPayment PaymentMethod { get; set; }

        public LanguageOfInvoice Language { get; set; }

        public double DiscountPercentage { get; set; }

        public AdditionalInvoiceOptions AdditionalOptions { get; set; }


    }
}
