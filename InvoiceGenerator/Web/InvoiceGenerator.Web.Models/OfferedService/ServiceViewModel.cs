using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Services.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.OfferedService
{
    public class ServiceViewModel:IMapFrom<Service>
    {
        public string  Name { get; set; }

        public decimal DefaultPriceWithoutVat { get; set; }

        public double VatRate { get; set; }

        public DateTime DateOfLastSale { get; set; }
    }
}
