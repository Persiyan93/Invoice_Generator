using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Data.Models
{
    public class Client : Company
    {
        public Client()
        {

            this.ContactList = new HashSet<ContactPerson>();
            this.Invoices = new HashSet<Invoice>();


        }

        public RegisteredCompany Seller { get; set; }

        public string SellerId { get; set; }

        public Address MailingAddress { get; set; }

        public string MailingAddressId { get; set; }

        public ICollection<ContactPerson> ContactList { get; set; }

        public ICollection<Invoice> Invoices { get; set; }


    }
}
