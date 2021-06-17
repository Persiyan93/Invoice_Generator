using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Services.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.Articles
{
    public class ArticleViewModel:IMapFrom<Article>
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public double VatRate { get; set; }
    }
}
