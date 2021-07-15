using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.Articles
{
    public class ArticleToInvoiceInputModel
    {
        [Required]
        public string Id { get; set; }

        [Required]
        public decimal PriceWithoutVat { get; set; }

        public string AdditionInformation { get; set; }
    }
}
