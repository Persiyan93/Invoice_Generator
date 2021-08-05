using InvoiceGenerator.Data.Models.Enum;
using InvoiceGenerator.Web.Models.Articles;
using InvoiceGenerator.Web.Models.JsonConverters;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.Invoices
{
    public class InvoiceInputModel
    {
        [Required]
        public string ClientId { get; set; }

        public  string ContactPersonId { get; set; }

        [Required]
        public decimal PriceWithoutVat { get; set; }

        [Required]
        public decimal VatValue { get; set; }

        [Required]
        [JsonConverter(typeof(DateTimeConverter))]
        public DateTime IssueDate { get; set; }


        public int  PaymentPeriod{ get; set; }


        public ICollection<ArticleToInvoiceInputModel > Articles { get; set; }


        [Required]
        [JsonConverter(typeof(DateTimeConverter))]
        public DateTime DateOfTaxEvent { get; set; }

        [Required]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public MethodsOfPayment PaymentMethod { get; set; }


        [JsonConverter(typeof(JsonStringEnumConverter))]
        public LanguageOfInvoice Language { get; set; }

        public double DiscountPercentage { get; set; }

        public AdditionalInvoiceOptions AdditionalOptions { get; set; }


    }
}
