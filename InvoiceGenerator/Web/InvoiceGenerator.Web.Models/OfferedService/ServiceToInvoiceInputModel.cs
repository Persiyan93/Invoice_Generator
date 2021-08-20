using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.OfferedService
{
    public class ServiceToInvoiceInputModel
    {
        [Required]
        public string Id { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        public double Quantity { get; set; }
    }
}
