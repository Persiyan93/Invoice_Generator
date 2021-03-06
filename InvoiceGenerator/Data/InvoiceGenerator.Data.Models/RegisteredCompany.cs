using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Data.Models
{
    public class RegisteredCompany:Company
    {
        public RegisteredCompany()
        {
            this.Invoices = new HashSet<Invoice>();
            this.Users = new HashSet<ApplicationUser>();
            this.Clients = new HashSet<Client>();
            this.Articles = new HashSet<Article>();
            this.Emails = new HashSet<Email>();
            this.BankAccounts = new HashSet<BankAccount>();

        }
        public string AdministratorId { get; set; }

        public CompanySettings DefaultInvoiceOptions { get; set; }

        public string DefaultInvoiceOptinsId { get; set; }

        public ApplicationUser Administrator { get; set; }

        public ICollection<Invoice> Invoices { get; set; }

        public ICollection<ApplicationUser> Users { get; set; }

        public ICollection<Client> Clients { get; set; }

        public ICollection<Article> Articles { get; set; }

        public ICollection<Service> Services { get; set; }

        public ICollection<BankAccount> BankAccounts { get; set; }

        public ICollection<Email> Emails { get; set; }


    }
}
