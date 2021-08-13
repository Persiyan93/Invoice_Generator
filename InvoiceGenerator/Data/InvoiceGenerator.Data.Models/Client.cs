using InvoiceGenerator.Data.Models.Enum;
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
            this.Status = ClientStatus.Active;


        }

        public RegisteredCompany Seller { get; set; }

        public ClientStatus Status { get; set; }

        public string SellerId { get; set; }

        public Address MailingAddress { get; set; }

        public string MailingAddressId { get; set; }

        public ICollection<ContactPerson> ContactList { get; set; }

        public ICollection<Invoice> Invoices { get; set; }


    }
}
