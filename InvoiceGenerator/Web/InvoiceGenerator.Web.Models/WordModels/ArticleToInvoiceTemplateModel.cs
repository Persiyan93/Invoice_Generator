using AutoMapper;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Data.Models.Enum;
using InvoiceGenerator.Services.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.WordModels
{
    public class ArticleToInvoiceTemplateModel : IMapFrom<InvoiceToArticle>, IHaveCustomMappings
    {
        public string Name { get; set; }

        public string UnitType { get; set; }

        public double Quantity { get; set; }

        public decimal UnitPrice { get; set; }

      

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<InvoiceToArticle, ArticleToInvoiceTemplateModel>()
                .ForMember(x => x.Name, opt =>
                               opt.MapFrom(i => i.Article.Name))
                .ForMember(x => x.UnitPrice, opt =>
                               opt.MapFrom(i => i.Article.UnitPrice))
               .ForMember(x => x.UnitType, opt =>
                               opt.MapFrom(i => i.Article.UnitType == ArticleUnitType.Count ? "Count" : "Kilogram"));







        }
    }
}
