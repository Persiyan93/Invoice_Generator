using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.BankAccount
{
    public class BankAccountInputModel
    {
        [Required]
        public string NameOfAccount { get; set; }

        [Required]
        public string BankName { get; set; }

        [Required]
        public string  Iban { get; set; }

        [Required]
        public string BicCode { get; set; }

    }
}
