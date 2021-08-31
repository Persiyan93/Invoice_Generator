using AutoMapper;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Services.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.WordModels
{
    public class ServiceToInvoiceTemplateModel :IMapFrom<InvoiceToService>,IHaveCustomMappings
    {
        public string Name { get; set; }

        public double Quantity { get; set; }

        public decimal UnitPrice { get; set; }

        public string UnitType { get; set; }

        public string AdditionalInfo { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<InvoiceToService, ServiceToInvoiceTemplateModel>()
                .ForMember(x => x.Name, opt =>
                           opt.MapFrom(s => s.Service.Name))
                 .ForMember(x => x.Quantity, opt =>
                           opt.MapFrom(s => s.Quantity))
                  .ForMember(x => x.UnitPrice, opt =>
                           opt.MapFrom(s => s.PriceWithoutVat))
                   .ForMember(x => x.UnitType, opt =>
                           opt.MapFrom(s => "Бр."));

        }
    }
}
