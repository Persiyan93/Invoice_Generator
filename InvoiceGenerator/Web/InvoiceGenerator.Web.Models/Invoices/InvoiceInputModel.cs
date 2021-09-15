using InvoiceGenerator.Data.Models.Enum;
using InvoiceGenerator.Web.Models.Articles;
using InvoiceGenerator.Web.Models.JsonConverters;
using InvoiceGenerator.Web.Models.OfferedService;
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

        public ICollection<ServiceToInvoiceInputModel> Services { get; set; }
        [Required]
        [JsonConverter(typeof(DateTimeConverter))]
        public DateTime DateOfTaxEvent { get; set; }

        [Required]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public MethodsOfPayment PaymentMethod { get; set; }

        [Required]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public Language InvoiceLanguage { get; set; }



        public bool IsInvoiceWithZeroVatRate { get; set; }

        public string ReasonForInvoiceWithZeroVatRate { get; set; }


        public string BankAccountId { get; set; }



        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (IsInvoiceWithZeroVatRate && ReasonForInvoiceWithZeroVatRate == null)
            {
                yield return new ValidationResult("Reason for invoice with zero vat rate is required !");
            }
            if (PaymentMethod==MethodsOfPayment.BankTransfer&&BankAccountId==null)
            {
                yield return new ValidationResult("You should select Bank Account");
            }
        }
    }
}
