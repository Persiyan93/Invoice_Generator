using InvoiceGenerator.Services.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.BankAccount
{
    public class BankAccountViewModel:IMapFrom<InvoiceGenerator.Data.Models.BankAccount>
    {
        public string Id { get; set; }

        public string AccountName { get; set; }

        public bool IsActive { get; set; }

        public string BankName { get; set; }

        public string BicCode { get; set; }

        public string Iban { get; set; }
    }
}
