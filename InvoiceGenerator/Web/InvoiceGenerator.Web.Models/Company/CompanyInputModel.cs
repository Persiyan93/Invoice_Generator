
using InvoiceGenerator.Data.Models.Enum;
using InvoiceGenerator.Web.Models.Address;

using System.ComponentModel.DataAnnotations;


namespace InvoiceGenerator.Web.Models.Company
{
    public class CompanyInputModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public TypeOfCompany CompanyType { get; set; }

        [Required]
        public AddressInputModel   Address { get; set; }

        [Required]
        public string VatNumber { get; set; }


        public string AccontablePersonName { get; set; }


        public string UniqueIdentificationNumber { get; set; }
    }
}
