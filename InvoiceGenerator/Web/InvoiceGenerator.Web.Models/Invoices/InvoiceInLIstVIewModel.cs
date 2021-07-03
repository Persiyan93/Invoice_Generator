using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Services.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.Invoices
{
    public class InvoiceInLIstVIewModel:IMapFrom<Invoice>
    {
        public string Id { get; set; }

        public decimal Price { get; set; }

        public DateTime DateOfIssue { get; set; }

        public string ClientName { get; set; }

        public string ClientId { get; set; }

        public DateTime PaymentDueDate { get; set; }


    }
}
