using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.Invoices
{
    public class InvoiceInClientViewModel
    {
        public string Id { get; set; }

        public decimal Price { get; set; }

        public DateTime DateOfIssue { get; set; }

        public DateTime MaturityDate { get; set; }

        public string ContractNumber { get; set; }
    }
}
