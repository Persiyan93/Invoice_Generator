using InvoiceGenerator.Web.Models.Company;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.Client
{
    public class ClientInputModel : CompanyInputModel
    {
        [EmailAddress]
         public string CompanyEmailAddress { get; set; }
    }
}
