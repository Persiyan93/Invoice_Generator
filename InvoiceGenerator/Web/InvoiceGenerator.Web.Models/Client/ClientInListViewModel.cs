using AutoMapper;
using InvoiceGenerator.Data.Models.Enum;
using InvoiceGenerator.Services.Mapping;
using InvoiceGenerator.Web.Models.Invoices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.Client
{
    public class ClientInListViewModel : IMapFrom<InvoiceGenerator.Data.Models.Client>, IHaveCustomMappings
    {
        public ClientInListViewModel()
        {
            this.Invoices = new HashSet<InvoiceInClientViewModel>();
        }
        public string Id { get; set; }

        public string Name { get; set; }

        public string VatNumber { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public ClientStatus Status { get; set; }

        public int CountOfInvoices { get; set; }

        public int CountOfUnPaidInvoices { get; set; }

        public int CountOfOverdueInvoices { get; set; }

        public decimal ValueSumOfAllUnPaidInvoices { get; set; }

        public decimal PriceOfAllOverdueInvoices { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public TypeOfCompany CompanyType { get; set; }

        public ICollection<InvoiceInClientViewModel> Invoices { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {

            configuration.CreateMap<InvoiceGenerator.Data.Models.Client, ClientInListViewModel>()
                .ForMember(x => x.CountOfInvoices, opt =>
                           opt.MapFrom(c=>c.Invoices.Count()))
                .ForMember(x => x.CountOfOverdueInvoices, opt =>
                               opt.MapFrom(y => y.Invoices.Where(i => i.Status == InvoiceStatus.Overdue).Count()))
                .ForMember(x => x.PriceOfAllOverdueInvoices, opt =>
                                opt.MapFrom(y => y.Invoices.Where(i => i.Status == InvoiceStatus.Overdue)
                                            .Sum(i => (i.PriceWithoutVat + i.VatValue))))
                .ForMember(x => x.CountOfUnPaidInvoices, opt =>
                               opt.MapFrom(y => y.Invoices.Where(i => i.Status == InvoiceStatus.WaitingForPayment).Count()))
                 .ForMember(x => x.ValueSumOfAllUnPaidInvoices, opt =>
                               opt.MapFrom(y => y.Invoices.Where(i => i.Status != InvoiceStatus.Paid).Sum(i=>(i.PriceWithoutVat+i.VatValue))));

            //

        }
    }
}
