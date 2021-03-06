using AutoMapper;
using InvoiceGenerator.Common;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Data.Models.Enum;
using InvoiceGenerator.Services.Mapping;

using InvoiceGenerator.Web.Models.WordModels;
using System;
using System.Collections.Generic;
using System.Linq;

namespace InvoiceGenerator.Services.MicrosoftWordService.Models
{
    public class InvoiceTemplateModel : TemplateModel, IMapFrom<Invoice>, IHaveCustomMappings
    {


        public InvoiceTemplateModel()
        {
            this.Articles = new List<ArticleToInvoiceTemplateModel>();
            this.Services = new List<ServiceToInvoiceTemplateModel>();

        }


        public int InvoiceNumber { get; set; }

        public string ClientCompanyName { get; set; }

        public string ClientVatNumber { get; set; }

        public string ClientAddress { get; set; }

        public string ClientUniqueIdentificationNumber { get; set; }

        public string ClientAccontablePersonName { get; set; }

        public string SellerVatNumber { get; set; }

        public string SellerCompanyName { get; set; }

        public string SellerAddress { get; set; }

        public string SellerUniqueIdentificationNumber { get; set; }

        public string SellerAccontablePersonName { get; set; }

        public BankAccountTemplateModel BankAccount { get; set; }

        public string PriceWithoutVat { get; set; }

        public string VatValue { get; set; }

        public string IssueDate { get; set; }

        public string InvoicePrice { get; set; }

        public string MethodOfPayment { get; set; }

        public string DateOfTaxEvent { get; set; }

        public string CreatedBy { get; set; }

        public double VatRate { get; set; }

        public bool IsWithZeroVatRate { get; set; }

        public string ReazonForZeroVatRate { get; set; }

        public string PlaceOfPublishing { get; set; }

        public ICollection<ServiceToInvoiceTemplateModel> Services { get; set; }

        public ICollection<ArticleToInvoiceTemplateModel> Articles { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {


            configuration.CreateMap<Invoice, InvoiceTemplateModel>()
                .ForMember(x => x.ClientCompanyName, opt =>
                                opt.MapFrom(y => $"\"{y.Client.Name}\" {StringConverter.TranslateCompanyTypeToBulgarianLanguage(y.Client.CompanyType)}"))
                .ForMember(x => x.ClientVatNumber, opt =>
                              opt.MapFrom(y => y.Client.VatNumber))
                .ForMember(x => x.ClientAddress, opt =>
                              opt.MapFrom(y => y.Client.Address.Town.Country.Name + " , " + y.Client.Address.Town.Name + " , " + y.Client.Address.AddressText))
                  .ForMember(x => x.ClientUniqueIdentificationNumber, opt =>
                              opt.MapFrom(y => y.Client.UniqueIdentificationNumber))
                  .ForMember(x => x.ClientAccontablePersonName, opt =>
                              opt.MapFrom(y => y.Client.AccontablePersonName))
                   .ForMember(x => x.SellerVatNumber, opt =>
                                    opt.MapFrom(y => y.Seller.VatNumber))
                   .ForMember(x => x.SellerCompanyName, opt =>
                                opt.MapFrom(y => y.Seller.Name))

                   .ForMember(x => x.IssueDate, opt =>
                              opt.MapFrom(y => y.IssueDate.ToString("dd.MM.yyyy")))
                   .ForMember(x => x.DateOfTaxEvent, opt =>
                              opt.MapFrom(y => y.DateOfTaxEvent.ToString("dd.MM.yyyy")))
                   .ForMember(x => x.MethodOfPayment, opt =>
                              opt.MapFrom(y => y.PaymentMethod == MethodsOfPayment.Cash ? "Cash" : "BankTransfer"))
                   .ForMember(x => x.SellerCompanyName, opt =>
                                   opt.MapFrom(y => $"\"{y.Seller.Name}\" {StringConverter.TranslateCompanyTypeToBulgarianLanguage(y.Seller.CompanyType)}"))
                       .ForMember(x => x.SellerAccontablePersonName, opt =>
                                 opt.MapFrom(y => y.Seller.AccontablePersonName))
                        .ForMember(x => x.SellerUniqueIdentificationNumber, opt =>
                                 opt.MapFrom(y => y.Seller.UniqueIdentificationNumber))
                    .ForMember(x => x.InvoicePrice, opt =>
                              opt.MapFrom(y => ((double)y.PriceWithoutVat + (double)y.VatValue).ToString("F2")))
                       .ForMember(x => x.CreatedBy, opt =>
                                       opt.MapFrom(i => i.User.Name))
                    .ForMember(x => x.SellerAddress, opt =>
                              opt.MapFrom(y => y.Seller.Address.Town.Country.Name + " , " + y.Seller.Address.Town.Name + " , " + y.Seller.Address.AddressText))
                    .ForMember(x => x.IsWithZeroVatRate, opt =>
                                   opt.MapFrom(i => i.IsInvoiceWithZeroVatRate))
                    .ForMember(x => x.ReazonForZeroVatRate, opt =>
                                   opt.MapFrom(i => i.ReasonForInvoiceWithZeroVatRate))
                    .ForMember(x => x.PlaceOfPublishing, opt =>
                                   opt.MapFrom(i => i.Seller.Address.Town.Name))
                    .ForMember(x => x.VatRate, opt =>
                                opt.MapFrom(i => i.Services.Count == 0 ? 0 : (i.Services.Sum(x => x.Service.VatRate) / i.Services.Count)));

        }
    }
}
