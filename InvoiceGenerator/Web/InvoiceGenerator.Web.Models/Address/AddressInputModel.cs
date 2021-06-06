using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.Address
{
    public class AddressInputModel
    {
        [Required]
        public string AddressText { get; set; }

        [Required]
        public string TownName { get; set; }

        [Required]
        public string CountryName { get; set; }
    }
}
