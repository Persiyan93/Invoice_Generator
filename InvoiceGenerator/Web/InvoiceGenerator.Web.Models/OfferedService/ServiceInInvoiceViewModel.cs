using AutoMapper;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Services.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.OfferedService
{
    public class ServiceInInvoiceViewModel :IMapFrom<InvoiceToService>,IHaveCustomMappings
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public double Quantity { get; set; }

        public double VatRate { get; set; }

        public decimal Price { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<InvoiceToService, ServiceInInvoiceViewModel>()
                .ForMember(x => x.Price, opt =>
                       opt.MapFrom(s => s.PriceWithoutVat))
                .ForMember(x => x.Name, opt =>
                       opt.MapFrom(s => s.Service.Name))
                .ForMember(x => x.VatRate, opt =>
                       opt.MapFrom(s => s.Service.VatRate))
                .ForMember(x => x.Id, opt =>
                               opt.MapFrom(s => s.ServiceId));
        }
    }
}
