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

namespace InvoiceGenerator.Web.Models.HomeContent
{
    public class HomePageContentModel:IMapFrom<HomePageContent>,IHaveCustomMappings
    {

        public string Id { get; set; }

        public string Name { get; set; }

        public string BulgarianName { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public HomePageContentTypes  Type { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<HomePageContent, HomePageContentModel>()
                 .ForMember(x => x.BulgarianName, opt =>
                            opt.MapFrom(c => c.BulgarainName));
        }
    }
}
