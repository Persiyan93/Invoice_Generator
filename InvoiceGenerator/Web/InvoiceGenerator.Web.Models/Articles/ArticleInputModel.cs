using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Data.Models.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.Articles
{
    public class ArticleInputModel :IValidatableObject
    {

        [Required]
        public string Name { get; set; }

        [Required]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public ArticleUnitType UnitType { get; set; }

        [Required]
        public int ArticleNumber { get; set; }

        [Required]
        public double  VatRate { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        public double Quantity { get; set; }

        [Required]
        public bool QuantityMonitoring { get; set; }

        public double QuantityLowerLimit { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (QuantityMonitoring&&QuantityLowerLimit==0)
            {
                yield return new ValidationResult("Quantity lower limit is required !");
            }

        }
    }
}
