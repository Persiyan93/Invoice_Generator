using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Data.Models
{
    public class InvoiceToArticle
    {
        public InvoiceToArticle()
        {
            this.Id = Guid.NewGuid().ToString();
        }
        public string Id { get; set; }

        public Invoice Invoice { get; set; }

        public string InvoiceId { get; set; }

        public Article Article { get; set; }

        public string ArticleId { get; set; }

       public decimal Discount { get; set; }

        public double Quantity { get; set; }

        public decimal ArticlePrice { get; set; }
    }
}
