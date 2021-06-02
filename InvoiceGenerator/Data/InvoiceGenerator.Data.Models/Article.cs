using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Data.Models
{
    public class Article
    {
        public Article()
        {
            this.Invoices = new HashSet<InvoiceToArticle>();
        }
        public string Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public ICollection<InvoiceToArticle> Invoices { get; set; }

    }
}
