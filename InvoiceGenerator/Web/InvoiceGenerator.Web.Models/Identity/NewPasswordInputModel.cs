using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.Identity
{
    public class NewPasswordInputModel
    {
        public string Password { get; set; }

        public string Email { get; set; }

        public string Token { get; set; }

    }
}
