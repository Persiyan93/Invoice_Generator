using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.OfferedService
{
   public  class ServiceInputModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public double VatRate { get; set; }

        [Required]
        public decimal  DefaultPrice { get; set; }
    }
}
