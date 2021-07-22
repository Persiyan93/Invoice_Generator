using InvoiceGenerator.Data.Models.Enum;
using InvoiceGenerator.Services.Mapping;
using InvoiceGenerator.Web.Models.Address;
using InvoiceGenerator.Web.Models.Invoices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.Client
{
   public  class ClientViewModel:IMapFrom<InvoiceGenerator.Data.Models.Client>
    {
        public string Name { get; set; }

        public string VatNumber { get; set; }

        public TypeOfCompany CompanyType { get; set; }

        public string UniqueIdentificationNumber { get; set; }

        public AddressViewModel Address { get; set; }


        public ICollection<InvoiceInClientViewModel> LastTenInvoices { get; set; }

        public int CountOfAllInvoices { get; set; }

        public int CountOfOverdueInvoices { get; set; }



        
    }
}
