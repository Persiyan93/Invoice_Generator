using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.WordModels
{
    public class BankInfoModel
    {
        public string Name { get; set; }

        public string  Bic { get; set; }

        public string Iban { get; set; }
    }
}
