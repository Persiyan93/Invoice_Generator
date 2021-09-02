using InvoiceGenerator.Data.Models.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.Invoices
{
    public class DefaultInvoiceOptions
    {

        public int  PaymentTerm { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public Language InvoiceLangage { get; set; }

        public string BankAccountId { get; set; }
    }
}
