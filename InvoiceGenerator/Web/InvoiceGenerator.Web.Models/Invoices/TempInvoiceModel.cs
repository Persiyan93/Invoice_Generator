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
   public  class TempInvoiceModel: IMapFrom<Invoice>
    {

        public string ClientId { get; set; }

        public string ContactPersonId { get; set; }

        public decimal? VatValue { get; set; }

        public decimal? PriceWithoutVat { get; set; }


        [JsonConverter(typeof(DateTimeConverter))]
        public DateTime? IssueDate { get; set; }

        public int? PaymentTerm { get; set; }

        public ICollection<ArticleToInvoiceInputModel> Articles { get; set; }

        [JsonConverter(typeof(DateTimeConverter))]
        public DateTime? DateOfTaxEvent { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public MethodsOfPayment PaymentMethod { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public LanguageOfInvoice Language { get; set; }

        public double? DiscountPercentage { get; set; }

        public AdditionalInvoiceOptions AdditionalOptions { get; set; }
    }
}
