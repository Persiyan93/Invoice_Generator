
using InvoiceGenerator.Common.Resources;
using InvoiceGenerator.Data.Models.Enum;
using InvoiceGenerator.Web.Models.Address;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace InvoiceGenerator.Web.Models.Company
{
    public class CompanyInputModel:IValidatableObject
    {
        [Required]
        public string CompanyName { get; set; }

        [Required]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public TypeOfCompany CompanyType { get; set; }
        
        [Required]
        public AddressInputModel   Address { get; set; }

        [Required]
        [RegularExpression(@"^[A-Z]{2}\d{9}$",ErrorMessage ="InvalidVatNumber")]
        public string VatNumber { get; set; }

        
        public string AccontablePersonName { get; set; }


        public string UniqueIdentificationNumber { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (UniqueIdentificationNumber.Length==0&&Address.Country.Contains("България"))
            {
                yield return new ValidationResult("Quantity lower limit is required !");
            }
        }
    }
}
