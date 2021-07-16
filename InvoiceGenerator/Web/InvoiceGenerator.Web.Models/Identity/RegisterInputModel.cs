using InvoiceGenerator.Web.Models.Company;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.Identity
{
    public class RegisterInputModel
    {
        [Required(ErrorMessage = "User Name is required")]
        public string Name { get; set; }

        [Required]
        public string UserName { get; set; }

        [EmailAddress]
        [Required]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }

        public CompanyInputModel   CompanyDetails { get; set; }

    }
}
