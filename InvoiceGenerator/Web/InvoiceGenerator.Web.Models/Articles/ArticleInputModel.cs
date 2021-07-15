using InvoiceGenerator.Data.Models;
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

        public string Description { get; set; }

        public double  VatRate { get; set; }





    }
}
