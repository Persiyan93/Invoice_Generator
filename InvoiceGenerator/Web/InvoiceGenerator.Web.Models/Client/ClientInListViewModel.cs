using InvoiceGenerator.Services.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.Client
{
    public class ClientInListViewModel :IMapFrom<InvoiceGenerator.Data.Models.Client>
    {
        public string Name { get; set; }

        public string VatNumber { get; set; }

        public int ContOfInvoice { get; set; }

    }
}
