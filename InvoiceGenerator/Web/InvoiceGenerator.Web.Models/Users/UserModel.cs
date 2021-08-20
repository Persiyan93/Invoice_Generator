using InvoiceGenerator.Web.Models.AccessAreas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.Users
{
    public class UserModel
    {
        public string UserName { get; set; }

        public string FullName { get; set; }

        public string Email { get; set; }

        public UserAccessModel AccessAreas  { get; set; }
    }
}
