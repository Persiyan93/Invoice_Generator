using AutoMapper;
using InvoiceGenerator.Data.Models.Enum;
using InvoiceGenerator.Services.Mapping;
using InvoiceGenerator.Web.Models.Invoices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.Client
{
    public class ClientInListViewModel :IMapFrom<InvoiceGenerator.Data.Models.Client>,IHaveCustomMappings
    {
        public ClientInListViewModel()
        {
            this.Invoices = new HashSet<InvoiceInClientViewModel>();
        }
        public string Id { get; set; }

        public string Name { get; set; }

        public string VatNumber { get; set; }

        public int CountOfInvoice { get; set; }

        public int CountOfOverdueInvoices { get; set; }

        public ICollection<InvoiceInClientViewModel> Invoices { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
           
            configuration.CreateMap<InvoiceGenerator.Data.Models.Client, ClientInListViewModel>()
                .ForMember(x => x.CountOfInvoice, opt =>
                           opt.MapFrom(y => y.Invoices.Count))
                .ForMember(x => x.CountOfInvoice, opt =>
                               opt.MapFrom(y => y.Invoices.Where(i => i.Status == InvoiceStatus.Overdue).Count()));
        }
    }
}
