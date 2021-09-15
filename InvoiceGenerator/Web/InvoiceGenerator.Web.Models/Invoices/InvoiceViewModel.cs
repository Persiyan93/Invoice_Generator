
using AutoMapper;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Data.Models.Enum;
using InvoiceGenerator.Services.Mapping;
using InvoiceGenerator.Web.Models.Articles;
using InvoiceGenerator.Web.Models.JsonConverters;
using InvoiceGenerator.Web.Models.OfferedService;
using System;
using System.Collections.Generic;

using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.Invoices
{
    public class InvoiceViewModel : IMapFrom<Invoice>,IHaveCustomMappings
    {

        public string ClientId { get; set; }

        public int InvoiceNumber { get; set; }

        public string ContactPersonId { get; set; }

        public decimal VatValue { get; set; }

        public decimal PriceWithoutVat { get; set; }


        [JsonConverter(typeof(DateTimeConverter))]
        public DateTime IssueDate { get; set; }

       

        public ICollection<ArticleViewModelInInvoice> Articles { get; set; }

        public ICollection<ServiceInInvoiceViewModel> Services { get; set; }

        [JsonConverter(typeof(DateTimeConverter))]
        public DateTime? DateOfTaxEvent { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public MethodsOfPayment PaymentMethod { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public Language InvoiceLanguage { get; set; }

        public int PaymentPeriod { get; set; }

        public bool IsInvoiceWithZeroVatRate { get; set; }

        public string ReasonForInvoiceWithZeroVatRate { get; set; }

        public string BankAccountId { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<Invoice, InvoiceViewModel>()
                .ForMember(x => x.InvoiceLanguage, opt =>
                               opt.MapFrom(i => i.Language));
        }
    }
}
