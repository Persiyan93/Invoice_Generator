using InvoiceGenerator.Common.Resources;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.Identity
{
    public class LoginInputModel
    {
        [Required(ErrorMessageResourceType =typeof(Messages),ErrorMessageResourceName = "UserNameIsRequired")]
        public string UserName { get; set; }

        [Required]
        [MinLength(6)]
        public string  Password { get; set; }

    }
}
