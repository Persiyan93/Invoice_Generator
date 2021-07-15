using InvoiceGenerator.Data.Models.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Data.Models
{
    public class DefaultInvoiceOptions
    {
        public string Id { get; set; }

        public RegisteredCompany Company { get; set; }

        public string CompanyId { get; set; }

        public int DefaultPaymentTerm { get; set; }

        public LanguageOfInvoice DefaultLanguage { get; set; }
    }
}
