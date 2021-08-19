using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Data.Models
{
  public  class Email
    {
        public Email()
        {
            this.Id = Guid.NewGuid().ToString();
            this.Date = DateTime.UtcNow;
        }
        public string Id { get; set; }

        public string RegisteredCompanyId { get; set; }

        public RegisteredCompany RegisteredCompany { get; set; }

        public string ClientId { get; set; }

        public Client Client { get; set; }

        public string Message { get; set; }

        public DateTime Date { get; set; }


    }
}
