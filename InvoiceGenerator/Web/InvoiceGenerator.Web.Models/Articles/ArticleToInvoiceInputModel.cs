using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Services.Mapping;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.Articles
{
    public class ArticleToInvoiceInputModel : IMapFrom<InvoiceToArticle>
    {
        [Required]
        public string Id { get; set; }

        public decimal Discount { get; set; }

        [Required]
        public double Quantity { get; set; }
    }
}
