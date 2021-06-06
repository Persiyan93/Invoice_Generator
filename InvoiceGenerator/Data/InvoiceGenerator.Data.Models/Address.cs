using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Data.Models
{
    public class Address
    {
        public Address()
        {
            this.Id = Guid.NewGuid().ToString();
        }
        public string Id { get; set; }

        public string AddressText { get; set; }

        public Town Town { get; set; }

        public int TownId { get; set; }

    }
}
