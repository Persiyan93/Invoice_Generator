using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.Address
{
   public class MailingAddressInputModel :AddressModel
    {
        [Required]
        public string ClientId { get; set; }
    }
}
