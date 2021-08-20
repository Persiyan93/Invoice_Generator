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

namespace InvoiceGenerator.Web.Models.OfferedService
{
    public class ServiceViewModel:IMapFrom<Service>,IHaveCustomMappings
    {
        public string Id { get; set; }
        public string  Name { get; set; }

        public decimal DefaultPriceWithoutVat { get; set; }

        public double VatRate { get; set; }

        [JsonConverter(typeof(DateTimeConverter))]
        public DateTime DateOfLastSale { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public ProductStatus  Status { get; set; }

        public double CountOfSalesForCurrentMonth { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            var dateToday = DateTime.UtcNow;
            var firstDayOfMonth = new DateTime(dateToday.Year,dateToday.Month,1);
            configuration.CreateMap<Service, ServiceViewModel>()
                 .ForMember(x => x.DateOfLastSale, opt =>
                            opt.MapFrom(s => s.Invoices
                                        .OrderByDescending(s => s.Invoice.IssueDate)
                                        .Select(s => s.Invoice.IssueDate)
                                           .FirstOrDefault()))
                 .ForMember(x => x.CountOfSalesForCurrentMonth, opt =>
                                opt.MapFrom(s => s.Invoices
                                            .Where(i => DateTime.Compare(i.Invoice.IssueDate, firstDayOfMonth) >= 0)
                                            .Sum(s => s.Quantity)));

        }
    }
}
