using AutoMapper;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Services.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.Articles
{
    public class ArticleViewModelInInvoice:IMapFrom<InvoiceToArticle>,IHaveCustomMappings
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public double Quantity { get; set; }

        public decimal UnitPrice { get; set; }

        public decimal Discount { get; set; }

        public double VatRate { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<InvoiceToArticle, ArticleViewModelInInvoice>()
             .ForMember(x => x.UnitPrice, opt =>
                    opt.MapFrom(y =>y.ArticlePrice))
             .ForMember(x => x.Name, opt =>
                       opt.MapFrom(y => y.Article.Name))
              .ForMember(x => x.VatRate, opt =>
                       opt.MapFrom(y => y.Article.VatRate))
              .ForMember(x => x.Id, opt =>
                       opt.MapFrom(y => y.ArticleId));








        }
    }
}
