using System;

namespace InvoiceGenerator.Data.Models
{
    public class ContactPerson
    {
        public ContactPerson()
        {
            this.Id = Guid.NewGuid().ToString();
        }
        public string Id { get; set; }

        public string Name { get; set; }

        public string PhoneNumber { get; set; }

        public string EmailAddress { get; set; }

        public Client Client { get; set; }

        public string ClientId { get; set; }
    }
}