using InvoiceGenerator.Data.Models.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Data.Models
{
    public class CompanySettings
    {
        public CompanySettings()
        {
            this.Id = Guid.NewGuid().ToString();
        }
        public string Id { get; set; }

        public RegisteredCompany Company { get; set; }

        public string CompanyId { get; set; }

        public int DefaultPaymentTerm { get; set; }

        public bool SendAutomaticGeneratedEmails { get; set; }

        public int PeriodInDaysBetweenTwoRepatedEmails { get; set; }

        public Language DefaultInvoiceLanguage { get; set; }

        public string DefaultInvoiceBankAccountId { get; set; }

        public BankAccount DefaultInvoiceBankAccount { get; set; }

        public bool BlockClientWhenReachMaxCountOfUnpaidInvoices { get; set; }

        public int MaxCountOfUnPaidInvoices { get; set; }


    }
}
