using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Services.MicrosoftWordService.Models
{
    public class InvoiceTemplateModel
    {
        public string Number { get; set; }

        public string    BuyerCompanyName { get; set; }

        public string BuyerCompanyType { get; set; }

        public string BuyerVatNumber { get; set; }

        public string BuyerCountryName { get; set; }

        public string BuyerTownName { get; set; }

        public string BuyerAddressText { get; set; }

        public string BuyerUniqueIdentificationNumbe { get; set; }

        public string BuyerAccontablePersonName { get; set; }

        public string SellerVatNumber { get; set; }

        public string SellerCompanyName { get; set; }

        public string SellerCompanyType { get; set; }

        public string SellerCountryName { get; set; }

        public string SellerTownName { get; set; }

        public string SellerAddressText { get; set; }

        public string SellerUniqueIdentificationNumbe { get; set; }

        public string SellerAccontablePersonName { get; set; }

        public string Price { get; set; }

        public string  VatValue { get; set; }

        public string DateOfIssue { get; set; }

        public string MethodOfPayment { get; set; }

        public string DateOfTaxEvent { get; set; }

        public string CreatedBy { get; set; }

        public string ArticleName { get; set; }

        public string ArticlePrice { get; set; }

        public string ArticleQuantity { get; set; }

        public string ArticleVatValue { get; set; }






    }
}
