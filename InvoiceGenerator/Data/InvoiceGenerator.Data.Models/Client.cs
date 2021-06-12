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
           
            this.Employees = new HashSet<ContactPerson>();
            
        }

        public RegisteredCompany Seller { get; set; }

        public string SellerId { get; set; }

        public Address MailingAddress { get; set; }

        public string MailingAddressId { get; set; }

        public ICollection<ContactPerson> Employees { get; set; }
    }
}
