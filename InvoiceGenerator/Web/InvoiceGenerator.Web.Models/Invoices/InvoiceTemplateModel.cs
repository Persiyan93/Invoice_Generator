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

namespace InvoiceGenerator.Services.MicrosoftWordService.Models
{
    public class InvoiceTemplateModel : TemplateModel, IMapFrom<Invoice>, IHaveCustomMappings
    {
        public string InvoiceNumber { get; set; }

        public string ClientCompanyName { get; set; }

        public string ClientCompanyType { get; set; }

        public string ClientVatNumber { get; set; }

        public string ClientCountryName { get; set; }

        public string ClientTownName { get; set; }

        public string ClientAddressText { get; set; }

        public string ClientUniqueIdentificationNumber { get; set; }

        public string ClientAccontablePersonName { get; set; }

        public string SellerVatNumber { get; set; }

        public string SellerCompanyName { get; set; }

        public string SellerCompanyType { get; set; }

        //public string SellerCountryName { get; set; }

        //public string SellerTownName { get; set; }

        //public string SellerAddressText { get; set; }

        public string SellerAddress { get; set; }

        public string SellerUniqueIdentificationNumber { get; set; }

        public string SellerAccontablePersonName { get; set; }

        public string PriceWithoutVat { get; set; }

        public string VatValue { get; set; }

        public DateTime IssueDate { get; set; }

      
        public MethodsOfPayment MethodOfPayment { get; set; }

        public DateTime DateOfTaxEvent { get; set; }

        public string CreatedBy { get; set; }

        //public string ArticleName { get; set; }

        //public string ArticlePrice { get; set; }

        //public string ArticleQuantity { get; set; }

        //public string ArticleVatValue { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<Invoice, InvoiceTemplateModel>()
                .ForMember(x => x.ClientCompanyName, opt =>
                           opt.MapFrom(y => y.Client.Name))
                .ForMember(x => x.ClientCompanyType, opt =>
                              opt.MapFrom(y => y.Client.CompanyType))
                .ForMember(x => x.ClientVatNumber, opt =>
                              opt.MapFrom(y => y.Client.VatNumber))
                .ForMember(x => x.ClientCountryName, opt =>
                              opt.MapFrom(y => y.Client.Address.Town.Country.Name))
                 .ForMember(x => x.ClientTownName, opt =>
                              opt.MapFrom(y => y.Client.Address.Town.Name))
                  .ForMember(x => x.ClientAddressText, opt =>
                              opt.MapFrom(y => y.Client.Address.AddressText))
                  .ForMember(x => x.ClientUniqueIdentificationNumber, opt =>
                              opt.MapFrom(y => y.Client.UniqueIdentificationNumber))
                  .ForMember(x => x.ClientAccontablePersonName, opt =>
                              opt.MapFrom(y => y.Client.AccontablePersonName))
                 .ForMember(x => x.SellerVatNumber, opt =>
                                  opt.MapFrom(y => y.Seller.VatNumber))
                 .ForMember(x => x.SellerCompanyName, opt =>
                              opt.MapFrom(y => y.Seller.Name))
                   .ForMember(x => x.SellerCompanyType, opt =>
                              opt.MapFrom(y => y.Seller.CompanyType))
                 
                    .ForMember(x => x.SellerAccontablePersonName, opt =>
                              opt.MapFrom(y => y.Seller.AccontablePersonName))
                     .ForMember(x => x.SellerUniqueIdentificationNumber, opt =>
                              opt.MapFrom(y => y.Seller.UniqueIdentificationNumber))
                      .ForMember(x => x.SellerAddress, opt =>
                              opt.MapFrom(y => y.Seller.Address.Town.Country.Name +" , "+ y.Seller.Address.Town.Name+ " , "+ y.Seller.Address.AddressText));


              //.ForMember(x => x.SellerCountryName, opt =>
              //                opt.MapFrom(y => y.Seller.Address.Town.Country.Name))
              //     .ForMember(x => x.SellerTownName, opt =>
              //                opt.MapFrom(y => y.Seller.Address.Town.Name))
              //     .ForMember(x => x.SellerAddressText, opt =>
              //                opt.MapFrom(y => y.Seller.Address.AddressText))



        }
    }
}
