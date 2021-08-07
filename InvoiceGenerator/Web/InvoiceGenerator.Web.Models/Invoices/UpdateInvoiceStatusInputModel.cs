using InvoiceGenerator.Data.Models.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.Invoices
{
    public class UpdateInvoiceStatusInputModel
    {
        public ICollection<string> InvoiceIds { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public InvoiceStatus   Status{ get; set; }
    }
}
