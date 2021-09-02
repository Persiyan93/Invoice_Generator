using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Services.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.WordModels
{
    public class BankAccountTemplateModel:IMapFrom<InvoiceGenerator.Data.Models.BankAccount>
    {
        public string BankName { get; set; }

        public string  BicCode { get; set; }

        public string Iban { get; set; }
    }
}
