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

namespace InvoiceGenerator.Web.Models.Invoices
{
    public class DefaultInvoiceOptions:IMapFrom<CompanySettings>,IHaveCustomMappings
    {

        public int  PaymentPeriod { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public Language InvoiceLanguage { get; set; }

        public string BankAccountId { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<CompanySettings, DefaultInvoiceOptions>()
                .ForMember(x => x.PaymentPeriod, opt =>
                               opt.MapFrom(c => c.DefaultPaymentTerm))
                 .ForMember(x => x.InvoiceLanguage, opt =>
                               opt.MapFrom(c => c.DefaultInvoiceLanguage))
                  .ForMember(x => x.BankAccountId, opt =>
                               opt.MapFrom(c => c.DefaultInvoiceBankAccountId));


        }
    }
}
