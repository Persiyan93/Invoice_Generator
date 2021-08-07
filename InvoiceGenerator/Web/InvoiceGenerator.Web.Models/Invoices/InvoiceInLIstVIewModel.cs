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

namespace InvoiceGenerator.Web.Models.Invoices
{
    public class InvoiceInListViewModel : IMapFrom<Invoice>, IHaveCustomMappings
    {
        public string Id { get; set; }

        public int InvoiceNumber { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public InvoiceStatus Status { get; set; }

        public decimal PriceWithVat { get; set; }

        [JsonConverter(typeof(DateTimeConverter))]
        public DateTime IssueDate { get; set; }

        [JsonConverter(typeof(DateTimeConverter))]
        public DateTime PaymentDueDate { get; set; }

        public string ClientName { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public TypeOfCompany ClientCompanyType { get; set; }

        public string ClientId { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<Invoice, InvoiceInListViewModel>()
              .ForMember(x => x.PriceWithVat, opt =>
                     opt.MapFrom(y => y.PriceWithoutVat + y.VatValue))
              .ForMember(x => x.ClientCompanyType, opt =>
                         opt.MapFrom(y => y.Client.CompanyType));
        }
    }
}
