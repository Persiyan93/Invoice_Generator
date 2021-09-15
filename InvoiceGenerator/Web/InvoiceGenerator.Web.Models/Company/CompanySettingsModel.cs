using AutoMapper;
using InvoiceGenerator.Data.Migrations;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Data.Models.Enum;
using InvoiceGenerator.Services.Mapping;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.Company
{
    public class CompanySettingsModel :IMapFrom<CompanySettings>,IHaveCustomMappings
    {
        public int DefaultPaymentTerm { get; set; }

        public bool SendAutomaticGeneratedEmails { get; set; }

        public int PeriodInDaysBetweenTwoRepatedEmails { get; set; }

        public bool BlockClient { get; set; }

        public  int MaxCountOfUnPaidInvoices { get; set; }


        [Required]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public Language  DefaultInvoiceLanguage { get; set; }
        
        public string DefaultInvoiceBankAccountId { get; set; }

        

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<CompanySettings, CompanySettingsModel>()
                .ForMember(x => x.BlockClient, opt =>
                                   opt.MapFrom(d => d.BlockClientWhenReachMaxCountOfUnpaidInvoices))
                .ForMember(x => x.DefaultInvoiceBankAccountId, opt =>
                           opt.MapFrom(d => d.DefaultInvoiceBankAccountId));
                    
        }
    }

}
