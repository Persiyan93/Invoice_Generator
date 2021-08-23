using AutoMapper;
using InvoiceGenerator.Data.Models.Enum;
using InvoiceGenerator.Services.Mapping;
using InvoiceGenerator.Web.Models.Address;
using InvoiceGenerator.Web.Models.Invoices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.Client
{
   public  class ClientViewModel:IMapFrom<InvoiceGenerator.Data.Models.Client>,IHaveCustomMappings
    {
        public string Name { get; set; }

        public string VatNumber { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public ClientStatus Status { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public TypeOfCompany CompanyType { get; set; }

        public string UniqueIdentificationNumber { get; set; }

        public AddressViewModel Address { get; set; }

        public ICollection<InvoiceInClientViewModel> LastTenInvoices { get; set; }

        public int CountOfUnpaidInvoices{ get; set; }

        public int CountOfOverdueInvoices { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<InvoiceGenerator.Data.Models.Client, ClientViewModel>()
                .ForMember(x => x.CountOfUnpaidInvoices,
                        opt => opt.MapFrom(c => c.Invoices.Where(x=>x.Status==InvoiceStatus.WaitingForPayment).Count()))
                .ForMember(x => x.CountOfOverdueInvoices,
                        opt => opt.MapFrom(x => x.Invoices.Where(i => i.Status == InvoiceStatus.Overdue).Count()));
                    
        }
    }
}
