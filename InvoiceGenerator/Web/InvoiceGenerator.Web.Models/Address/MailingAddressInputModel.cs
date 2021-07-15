using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.Address
{
   public class MailingAddressInputModel :AddressModel
    {
        public string ClientId { get; set; }
    }
}
