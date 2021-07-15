using InvoiceGenerator.Data.Models.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Data.Models
{
    public abstract class Company
    {
        public Company()
        {
            this.Id = Guid.NewGuid().ToString();
            this.IsActive = true;
        }
        public string Id { get; set; }

        public string Name { get; set; }

        public TypeOfCompany CompanyType { get; set; }

        public string AccontablePersonName { get; set; }

        public string Email { get; set; }

        public bool IsActive { get; set; }

        public string AddressId { get; set; }

        public Address Address { get; set; }

        public string VatNumber { get; set; }
        
        public string UniqueIdentificationNumber { get; set; }

        

       







    }
}
