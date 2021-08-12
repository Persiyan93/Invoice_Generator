using InvoiceGenerator.Data.Models.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Data.Models
{
    public class Service
    {

        public Service()
        {
            this.Id = Guid.NewGuid().ToString();
            this.Invoices = new HashSet<InvoiceToService>();
        }


        public string Id { get; set; }

        public string Name { get; set; }

        public ProductStatus  Status { get; set; }

        public decimal DefaultPriceWithoutVat { get; set; }

       public double VatRate { get; set; }

        public ICollection<InvoiceToService> Invoices { get; set; }

        public string CompanyId { get; set; }

        public RegisteredCompany Company { get; set; }
    }
}
