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
            this.Services = new HashSet<InvoiceToService>();
            this.History = new HashSet<InvoiceHistoryEvent>();
            this.Notifications = new HashSet<InvoiceNotification>();
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

        public int PaymentPeriod { get; set; }

       [ForeignKey("User")]
        public string CreatedByUserId { get; set; }

        public ApplicationUser User { get; set; }

        public LanguageOfInvoice Language { get; set; }

        public bool IsInvoiceWithZeroVatRate { get; set; }

        public string ReasonForInvoiceWithZeroVatRate { get; set; }

        public ICollection<InvoiceToArticle> Articles { get; set; }

        public ICollection<InvoiceHistoryEvent> History { get; set; }

        public ICollection<InvoiceToService> Services { get; set; }

        public ICollection<InvoiceNotification> Notifications { get; set; }



    }
}
