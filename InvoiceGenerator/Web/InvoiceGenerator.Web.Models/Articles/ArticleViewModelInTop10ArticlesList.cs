using AutoMapper;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Data.Models.Enum;
using InvoiceGenerator.Services.Mapping;
using InvoiceGenerator.Web.Models.JsonConverters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.Articles
{
    public class ArticleViewModelInTop10ArticlesList:IMapFrom<Article>,IHaveCustomMappings
    {
        public string Id { get; set; }
        public string Name { get; set; }    
        public string ArticleNumber { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public ArticleUnitType UnitType { get; set; }

        public double SumQuantityOfAllSales { get; set; }

        public decimal IncomesFromSales { get; set; }


        [JsonConverter(typeof(DateTimeConverter))]
        public DateTime DateOfLastSale { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public ProductStatus Status { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<Article, ArticleViewModelInTop10ArticlesList>()
                .ForMember(x => x.DateOfLastSale, opt =>
                       opt.MapFrom(a => a.Invoices
                                           .OrderByDescending(i => i.Invoice.IssueDate)
                                           .Select(x => x.Invoice.IssueDate)
                                           .FirstOrDefault()))
                .ForMember(x => x.IncomesFromSales, opt =>
                               opt.MapFrom(a => a.Invoices.Sum(x => ((decimal)x.Quantity * x.ArticlePrice))))
                .ForMember(x => x.SumQuantityOfAllSales, opt =>
                                   opt.MapFrom(a => a.Invoices.Sum(i => i.Quantity)));
        }
    }
}
