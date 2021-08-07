
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Data.Models.Enum;
using InvoiceGenerator.Services.Mapping;
using InvoiceGenerator.Web.Models.Articles;
using InvoiceGenerator.Web.Models.JsonConverters;
using System;
using System.Collections.Generic;

using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.Invoices
{
    public class InvoiceViewModel : IMapFrom<Invoice>
    {

        public string ClientId { get; set; }

        public string ContactPersonId { get; set; }

        public decimal VatValue { get; set; }

        public decimal PriceWithoutVat { get; set; }


        [JsonConverter(typeof(DateTimeConverter))]
        public DateTime IssueDate { get; set; }

       

        public ICollection<ArticleViewModelInInvoice> Articles { get; set; }

        [JsonConverter(typeof(DateTimeConverter))]
        public DateTime? DateOfTaxEvent { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public MethodsOfPayment PaymentMethod { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public LanguageOfInvoice Language { get; set; }

        

        public int PaymentPeriod { get; set; }

        public bool IsInvoiceWithZeroVatRate { get; set; }

        public string ReasonForInvoiceWithZeroVatRate { get; set; }
    }
}
