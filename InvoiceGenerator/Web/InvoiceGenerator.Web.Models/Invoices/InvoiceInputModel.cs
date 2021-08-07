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
    public class InvoiceInputModel : IValidatableObject
    {
        [Required]
        public string ClientId { get; set; }

        [Required]
        [JsonConverter(typeof(DateTimeConverter))]
        public DateTime IssueDate { get; set; }


        public int PaymentPeriod { get; set; }


        public ICollection<ArticleToInvoiceInputModel> Articles { get; set; }


        [Required]
        [JsonConverter(typeof(DateTimeConverter))]
        public DateTime DateOfTaxEvent { get; set; }

        [Required]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public MethodsOfPayment PaymentMethod { get; set; }


        [JsonConverter(typeof(JsonStringEnumConverter))]
        public LanguageOfInvoice Language { get; set; }



        public bool IsInvoiceWithZeroVatRate { get; set; }

        public string ReasonForInvoiceWithZeroVatRate { get; set; }



        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (IsInvoiceWithZeroVatRate && ReasonForInvoiceWithZeroVatRate == null)
            {
                yield return new ValidationResult("Reason for invoice with zero vat rate is required !");
            }
        }
    }
}
