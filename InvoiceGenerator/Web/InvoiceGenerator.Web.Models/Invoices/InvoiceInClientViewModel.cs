using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Data.Models.Enum;
using InvoiceGenerator.Services.Mapping;
using System;

namespace InvoiceGenerator.Web.Models.Invoices
{
    public class InvoiceInClientViewModel:IMapFrom<Invoice>
    {
        public string Id { get; set; }

        public decimal Price { get; set; }

        public int InvoiceNumber { get; set; }

        public DateTime DateOfIssue { get; set; }

        public DateTime PaymentDueDate { get; set; }

        public InvoiceStatus   Status { get; set; }
    }
}
