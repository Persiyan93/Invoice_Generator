
using InvoiceGenerator.Data.Models.Enum;
using InvoiceGenerator.Web.Models.Address;

using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace InvoiceGenerator.Web.Models.Company
{
    public class CompanyInputModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public TypeOfCompany CompanyType { get; set; }
        
        [Required]
        public AddressInputModel   Address { get; set; }

        [Required]
        [RegularExpression(@"^[A-Z]{2}\d{9}$",ErrorMessage ="Please check format of Vat number!")]
        public string VatNumber { get; set; }


        public string AccontablePersonName { get; set; }


        public string UniqueIdentificationNumber { get; set; }
    }
}
