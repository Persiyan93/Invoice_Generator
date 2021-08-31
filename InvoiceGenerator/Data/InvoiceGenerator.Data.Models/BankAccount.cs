using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Data.Models
{
    public class BankAccount
    {
        public BankAccount()
        {
            this.Id = Guid.NewGuid().ToString();
            this.Invoices = new HashSet<Invoice>();
        }
        public string Id { get; set; }

        public string AccountName { get; set; }

        public bool IsActive { get; set; }

        public string BankName { get; set; }

        public string BicCode { get; set; }

        public string Iban { get; set; }

        public string CompanyId { get; set; }

        public RegisteredCompany Company { get; set; }

        public ICollection<Invoice> Invoices { get; set; }
    }
}
