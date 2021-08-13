using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.AccessAreas
{
    public class AccessAreaModel
    {
        public bool InvoiceAccess { get; set; }
        
        public bool ProductsAccess { get; set; }

        public bool EmailAccess { get; set; }

        public bool UsersAccess { get; set; }
    }
}
