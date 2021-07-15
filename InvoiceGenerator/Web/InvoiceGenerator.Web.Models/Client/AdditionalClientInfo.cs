using InvoiceGenerator.Services.Mapping;
using InvoiceGenerator.Web.Models.Address;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.Client
{
    public class AdditionalClientInfo:IMapFrom<InvoiceGenerator.Data.Models.Client>
    {
        public AddressViewModel  Address { get; set; }

         public AddressViewModel MailingAddress { get; set; }

    }
}
