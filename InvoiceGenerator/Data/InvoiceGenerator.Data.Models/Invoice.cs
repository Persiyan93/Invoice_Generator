using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Data.Models
{
    public class Invoice
    {
        public Invoice()
        {
            this.Id = Guid.NewGuid().ToString();
            this.Articles = new HashSet<InvoiceToArticle>();
        }
        public string Id { get; set; }

        public int InvoiceNumber { get; set; }

        public RegisteredCompany Seller { get; set; }


        public  string SellerId { get; set; }

        public Company Buyer { get; set; }

        public string BuyerId { get; set; }

        public string ContactPersonId { get; set; }
        public ContactPerson ContactPerson { get; set; }

        public DateTime IssueDate { get; set; }

        public DateTime PaymentDueDate { get; set; }

        public decimal Price { get; set; }

        public double VatRate { get; set; }

        public string CreatedByUserId { get; set; }

        public ICollection<InvoiceToArticle> Articles { get; set; }


    }
}
