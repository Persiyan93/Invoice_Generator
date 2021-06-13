using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.Address
{
    public interface IAddress
    {
        public string AddressText { get; set; }
      
        public string TownName { get; set; }

        
        public string CountryName { get; set; }
    }
}
