using InvoiceGenerator.Data.Models.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
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

        public Client Client { get; set; }

        public string ClientId { get; set; }

        public string ContactPersonId { get; set; }

        public ContactPerson ContactPerson { get; set; }

        public DateTime IssueDate { get; set; }

        public DateTime PaymentDueDate { get; set; }

        public DateTime DateOfTaxEvent { get; set; }

        public MethodsOfPayment PaymentMethod { get; set; }
        
        public decimal PriceWithoutVat { get; set; }

        public InvoiceStatus Status { get; set; }

        public decimal VatValue { get; set; }

        public double DiscountPercentage { get; set; }


        [ForeignKey("User")]
        public string CreatedByUserId { get; set; }

        public ApplicationUser User { get; set; }

        public LanguageOfInvoice Language { get; set; }

        public AdditionalInvoiceOptions AdditionalOptions { get; set; }

        public ICollection<InvoiceToArticle> Articles { get; set; }

       

    }
}
