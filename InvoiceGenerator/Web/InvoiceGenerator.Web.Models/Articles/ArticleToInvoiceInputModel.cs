using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.Articles
{
    public class ArticleToInvoiceInputModel
    {
        public string Id { get; set; }

        public decimal Price { get; set; }
    }
}
