using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.Client
{
    public class TopClientsViewModel
    {
        public string CompanyName { get; set; }

        public string VatNumber { get; set; }

        public int InvoiceCount { get; set; }

        public decimal IncomesFromInvoices { get; set; }

        public int CountOfOverdueInvoices { get; set; }

        public int CountOfPaidInvoices { get; set; }



    }
}
