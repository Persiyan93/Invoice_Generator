using AutoMapper;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Data.Models.Enum;
using InvoiceGenerator.Services.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.Articles
{
    public class ArticleViewModel:IMapFrom<Article>,IHaveCustomMappings
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string UnitPrice { get; set; }

        public double VatRate { get; set; }

        public double Quantity { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public ArticleUnitType UnitType { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<Article, ArticleViewModel>()
              .ForMember(x => x.UnitPrice, opt =>
                     opt.MapFrom(y => y.Price));
             
        }
    }
}
