using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Data.Models.Enum;
using InvoiceGenerator.Services.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.Invoices
{
    public class InvoiceEmailModel:IMapFrom<Invoice>
    {
        public string Id { get; set; }

        public string ClientName { get; set; }

        public string ClientEmailAddress { get; set; }

        public string SellerName { get; set; }

        public int InvoiceNumber { get; set; }

        public decimal  InvoicePriceWithVat { get; set; }

        public DateTime DateOfIssue { get; set; }

        public DateTime PaymentDueDate { get; set; }

        public string SellerId { get; set; }

        public int PaymenTerm { get; set; }

        
    }
}
