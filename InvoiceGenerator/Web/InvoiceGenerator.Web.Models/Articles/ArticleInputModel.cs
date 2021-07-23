using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Data.Models.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.Articles
{
    public class ArticleInputModel
    {
       
        public string Name { get; set; }

        public ArticleUnitType UnitType { get; set; }

        public double  VatRate { get; set; }

        public decimal Price { get; set; }

        public double Quantity { get; set; }







    }
}
