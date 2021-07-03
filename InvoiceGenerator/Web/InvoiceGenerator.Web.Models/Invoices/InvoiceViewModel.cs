using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Services.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.Invoices
{
    public class InvoiceViewModel:IMapFrom<Invoice>
    {
        public string ClientName { get; set; }

        public string SellerName { get; set; }

        public string InvoiceNumber { get; set; }

    }
}
