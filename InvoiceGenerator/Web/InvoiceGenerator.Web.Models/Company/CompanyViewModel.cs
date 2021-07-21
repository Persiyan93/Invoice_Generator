using InvoiceGenerator.Data.Models.Enum;
using InvoiceGenerator.Services.Mapping;
using InvoiceGenerator.Web.Models.Address;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.Company
{
    public class CompanyViewModel: IMapFrom<InvoiceGenerator.Data.Models.Company>
    {
          public string Id { get; set; }

        public string Name { get; set; }

        public string VatNumber { get; set; }

        public string UniqueIdentificationNumber { get; set; }

        public TypeOfCompany CompanyType { get; set; }

        public string AccontablePersonName { get; set; }

        public AddressViewModel Address { get; set; }

    }
}
