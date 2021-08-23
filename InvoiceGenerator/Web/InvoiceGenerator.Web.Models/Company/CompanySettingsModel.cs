using AutoMapper;
using InvoiceGenerator.Data.Migrations;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Services.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.Company
{
    public class CompanySettingsModel :IMapFrom<DefaultInvoiceOptions>,IHaveCustomMappings
    {
        public int DefaultPaymentTerm { get; set; }

        public bool SendAutomaticGeneratedEmails { get; set; }

        public int PeriodInDaysBetweenTwoRepatedEmails { get; set; }

        public bool BlockClient { get; set; }

        public  int MaxCountOfUnPaidInvoices { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<DefaultInvoiceOptions, CompanySettingsModel>()
                .ForMember(x => x.BlockClient, opt =>
                                   opt.MapFrom(d => d.BlockClientWhenReachMaxCountOfUnpaidInvoices));
        }
    }

}
