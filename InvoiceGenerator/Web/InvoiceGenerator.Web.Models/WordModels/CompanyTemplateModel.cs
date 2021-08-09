using AutoMapper;
using InvoiceGenerator.Common;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Services.Mapping;
using InvoiceGenerator.Services.MicrosoftWordService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.WordModels
{
    public class CompanyTemplateModel : TemplateModel, IMapFrom<RegisteredCompany>, IHaveCustomMappings
    {
        public string SellerVatNumber { get; set; }

        public string SellerCompanyName { get; set; }

        public string SellerAddress { get; set; }

        public string SellerUniqueIdentificationNumber { get; set; }

        public string SellerAccontablePersonName { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<RegisteredCompany, CompanyTemplateModel>()
                 .ForMember(x => x.SellerVatNumber, opt =>
                                  opt.MapFrom(y => y.VatNumber))
                .ForMember(x => x.SellerCompanyName, opt =>
                                opt.MapFrom(y => $"\"{y.Name}\" {StringConverter.TranslateCompanyTypeToBulgarianLanguage(y.CompanyType)}"))
                 .ForMember(x => x.SellerAddress, opt =>
                              opt.MapFrom(y => y.Address.Town.Country.Name + " , " + y.Address.Town.Name + " , " + y.Address.AddressText))
                   .ForMember(x => x.SellerAccontablePersonName, opt =>
                              opt.MapFrom(y => y.AccontablePersonName))
                     .ForMember(x => x.SellerUniqueIdentificationNumber, opt =>
                              opt.MapFrom(y => y.UniqueIdentificationNumber));

        }
    }
}
