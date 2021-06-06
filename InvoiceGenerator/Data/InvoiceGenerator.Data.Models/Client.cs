using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Data.Models
{
    public class Client:Company
    {
        public Client()
        {
            this.Sellers = new HashSet<SellerToBuyer>();
            this.Employees = new HashSet<ContactPerson>();
            
        }
        public ICollection<SellerToBuyer> Sellers { get; set; }

        public Address MailingAddress { get; set; }

        public string MailingAddressId { get; set; }

        public ICollection<ContactPerson> Employees { get; set; }
    }
}
