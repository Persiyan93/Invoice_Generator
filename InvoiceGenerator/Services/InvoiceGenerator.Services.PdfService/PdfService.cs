using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Globalization;
using System.Threading;
using Microsoft.Extensions.Localization;
using InvoiceGenerator.Common.Resources;
using InvoiceGenerator.Services.PdfService.Enum;
using InvoiceGenerator.Services.Data;
using InvoiceGenerator.Services.MicrosoftWordService.Models;
using InvoiceGenerator.Services.MicrosoftWordService;
using iText.Kernel.Font;
using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Element;
using iText.Layout.Properties;
using InvoiceGenerator.Services.PdfService.Resources;
using System.IO;
using iText.Kernel.Colors;
using InvoiceGenerator.Web.Models.WordModels;
using iText.Layout.Borders;

namespace InvoiceGenerator.Services.PdfService
{
    public class PdfService : IPdfService
    {


        private readonly IInvoiceService invoiceService;
       private readonly IStringLocalizer<InvoicePdfResource> stringLocalizer;

        private static string arialFontFileName = Path.Combine(Environment.CurrentDirectory, @"fonts\arial.ttf");
        private static string cambriaFontFileName = Path.Combine(Environment.CurrentDirectory, @"fonts\arial.ttf");
        private static string timesfontFileName = Path.Combine(Environment.CurrentDirectory, @"fonts\arial.ttf");
        private PdfFont artilFont;
        private PdfFont cambriaFont;
        private PdfFont timesFont;


        public PdfService(IInvoiceService invoiceService, IStringLocalizer<InvoicePdfResource> stringLocalizer)
        {

            this.invoiceService = invoiceService;
            this.stringLocalizer = stringLocalizer;
            this.artilFont= PdfFontFactory.CreateFont(arialFontFileName, iText.IO.Font.PdfEncodings.IDENTITY_H);
            this.cambriaFont =PdfFontFactory.CreateFont(cambriaFontFileName, iText.IO.Font.PdfEncodings.IDENTITY_H);
            this.timesFont= PdfFontFactory.CreateFont(timesfontFileName, iText.IO.Font.PdfEncodings.IDENTITY_H);
        }

        public async Task GenerateInvoicePdf(string invoiceId, InvoiceLanguage language)
        {
            var currCultur = CultureInfo.CurrentUICulture.Name;
            if (language==InvoiceLanguage.bg)
            {
                //String culture = "bg"; // defines spanish culture
                //Thread.CurrentThread.CurrentCulture = CultureInfo.CreateSpecificCulture(culture);
                //Thread.CurrentThread.CurrentUICulture = new CultureInfo(culture);

            }
            var invoice = await invoiceService.GetInvoiceByIdAsync<InvoiceTemplateModel>(invoiceId);
            GenerateInvoiceDocument(invoice, @"D:\Invoices\Test.pdf");
        }

        private void GenerateInvoiceDocument(InvoiceTemplateModel invoice, string dest)
        {
          
            PdfWriter writer = new PdfWriter(dest);
            PdfDocument pdf = new PdfDocument(writer);
            Document document = new Document(pdf);

            var myColor = new DeviceRgb(95, 184, 166);

            document.SetTopMargin(50);

            var invoiceNumberParagraph = new Paragraph(stringLocalizer["InvoiceNumber", invoice.InvoiceNumber])
                    .SetFont(cambriaFont).SetBold().SetFontSize(16).SetItalic().SetTextAlignment(TextAlignment.CENTER);
            invoiceNumberParagraph.SetMarginBottom(50);
            document.Add(invoiceNumberParagraph);
            var companiesInfoTable = new Table(2);
            var buyerCompanyCell = CreateCompanyinfoCell("Buyer", invoice.ClientCompanyName
                                                , invoice.ClientAddress, invoice.ClientUniqueIdentificationNumber
                                                , invoice.ClientVatNumber, invoice.ClientAccontablePersonName);
            buyerCompanyCell.SetMaxWidth(250);
            buyerCompanyCell.SetBackgroundColor(myColor);
            companiesInfoTable.AddCell(buyerCompanyCell);



            var sellerCompanyCell = CreateCompanyinfoCell("Seller", invoice.SellerCompanyName
                            , invoice.SellerAddress, invoice.SellerUniqueIdentificationNumber 
                            ,invoice.SellerVatNumber, invoice.SellerAccontablePersonName);
            sellerCompanyCell.SetMaxWidth(250);
            sellerCompanyCell.SetBackgroundColor(myColor);
            companiesInfoTable.AddCell(sellerCompanyCell);

            companiesInfoTable.SetMarginBottom(100);
            

            document.Add(companiesInfoTable);

            var productsTable = CreateProductTable(invoice.Services, invoice.Articles);



            //Add finalPriceOfInvoice
            var emptyCell = new Cell(1, 4);
            productsTable.AddCell(emptyCell);
            var finalPriceCell = new Cell();
            finalPriceCell.SetMarginTop(5);
            finalPriceCell.SetTextAlignment(TextAlignment.RIGHT);
            var priceWhithoutVatParagraph = new Paragraph(stringLocalizer["PriceWithoutVat", invoice.PriceWithoutVat]).SetFont(cambriaFont);
            var vatValueCell = new Paragraph(stringLocalizer["VatRate", invoice.VatRate, invoice.VatValue]).SetFont(cambriaFont);
            var WholePriceCell = new Paragraph(stringLocalizer["WholePrice", invoice.InvoicePrice]).SetFont(cambriaFont);
            finalPriceCell.Add(priceWhithoutVatParagraph);
            finalPriceCell.Add(vatValueCell);
            finalPriceCell.Add(WholePriceCell);
            finalPriceCell.SetFont(cambriaFont).SetItalic();
            productsTable.AddCell(finalPriceCell);
            //productsTable.SetMarginBottom(200);
            document.Add(productsTable);



            var invoiceAdditionalInfoTable = new Table(3);
            invoiceAdditionalInfoTable.UseAllAvailableWidth();

            //Add Recipient Cell
            var recipientCell = CreateInfoCell("InvoiceRecepient");
            invoiceAdditionalInfoTable.AddCell(recipientCell);
            

            //Add Payment Method  Cell with Seller Bank Info
            var paymentMethodCell = new Cell();
            paymentMethodCell.SetMinWidth(150);
            //paymentMethodCell
            //    .Add(new Paragraph(stringLocalizer["PaymentMethodName"] + stringLocalizer[invoice.MethodOfPayment]))
            //    .SetFont(artilFont).SetFontSize(10);
            //paymentMethodCell
            //            .Add(new Paragraph("Bank: " + $"{invoice.SellerBankInfo.Name}")
            //            .SetFont(artilFont).SetFontSize(10));
            //paymentMethodCell
            //           .Add(new Paragraph("BIC: " + $"{invoice.SellerBankInfo.Bic}")
            //           .SetFont(artilFont).SetFontSize(10));
            //paymentMethodCell
            //\          .Add(new Paragraph("IBAN: " + $"{invoice.SellerBankInfo.Iban}")
            //           .SetFont(artilFont).SetFontSize(10));
            invoiceAdditionalInfoTable.AddCell(paymentMethodCell);

            //Add Creator Cell
            var createByCell = CreateInfoCell("CreatedBy",invoice.CreatedBy);
            invoiceAdditionalInfoTable.AddCell(createByCell);


            document.Add(invoiceAdditionalInfoTable);
           

            
                




            //Set IssuDate and Creator

            //var invoiceInfoTable = new Table(2);
            //invoiceInfoTable.UseAllAvailableWidth();
         
            //var issuDateCell = new Cell();
            //issuDateCell.SetBorder(Border.NO_BORDER);
            //issuDateCell.SetTextAlignment(TextAlignment.LEFT);
            //issuDateCell.Add(new Paragraph(stringLocalizer["Year", invoice.IssueDate]).SetFont(cambriaFont));
            //invoiceInfoTable.AddCell(issuDateCell);

            //var createdByCell = new Cell();
            //createdByCell.SetBorder(Border.NO_BORDER);
            //createdByCell.SetTextAlignment(TextAlignment.RIGHT);
            //var firstParagraph = new Paragraph(stringLocalizer["CreatedBy"] + " : .................");
            //createdByCell.Add(firstParagraph);

            //var createdByParagraph = new Paragraph(invoice.CreatedBy);
            //createdByCell.Add(createdByParagraph);
            //createdByCell.SetFont(cambriaFont);
            //invoiceInfoTable.AddCell(createdByCell);
            //document.Add(invoiceInfoTable);



            document.Close();
        
        }

        private Cell CreateCompanyinfoCell(string companyRole,string companyName,string companyAddress
                         ,string uniqueIdentificationNumber,string vatNumber,string accountablePersonName)
        {
            
            var cell = new Cell();
             cell.Add(new Paragraph(stringLocalizer[companyRole].Value).SetFont(timesFont).SetFontSize(11).SetTextAlignment(TextAlignment.CENTER).SetBold());
            cell.Add(new Paragraph(companyName).SetFont(timesFont).SetFontSize(11).SetTextAlignment(TextAlignment.CENTER).SetBold());
            
            //Set company address
            var addressParagraph = new Paragraph();
            addressParagraph.Add(new Text(stringLocalizer["Address"].Value).SetFont(timesFont).SetFontSize(11).SetBold());
            addressParagraph.Add(new Text(companyAddress).SetFont(timesFont).SetFontSize(11));
            cell.Add(addressParagraph);

            //Set Unique identification number
            if (uniqueIdentificationNumber != null)
            {
                var identificationNumberParagraph = new Paragraph();
                identificationNumberParagraph.Add(new Text(stringLocalizer["IdentificationNumber"].Value).SetFont(timesFont).SetFontSize(11).SetBold());
                identificationNumberParagraph.Add(uniqueIdentificationNumber);
                cell.Add(identificationNumberParagraph);
            }
           

            //Set VAT number
            var vatNumberParagraph = new Paragraph();
            vatNumberParagraph.Add(new Text(stringLocalizer["VatNumber"].Value).SetBold());
            vatNumberParagraph.Add(vatNumber).SetFont(timesFont).SetFontSize(11);
            cell.Add(vatNumberParagraph);

            //Set VAT number
            if (accountablePersonName!=null)
            {
                var accountablePersonParagraph = new Paragraph();
                accountablePersonParagraph.Add(new Text(stringLocalizer["AccountablePerson"].Value).SetBold());
                accountablePersonParagraph.Add(accountablePersonName)
                    .SetFont(timesFont).SetFontSize(11);
                cell.Add(accountablePersonParagraph);
            }
          
             return cell;
        }

        private Table CreateProductTable(ICollection<ServiceToInvoiceTemplateModel>services,ICollection<ArticleToInvoiceTemplateModel>articles)
        {
            var productTable = new Table(5);
            productTable.UseAllAvailableWidth();

            string[] headerTittles = { "ProductName", "UnitType", "Quantity", "UnitPrice", "Price" };
            foreach (var headerTittle in headerTittles)
            {
                var headerCell = new Cell();
                
                headerCell.Add(new Paragraph(stringLocalizer[headerTittle]).SetFont(cambriaFont).SetItalic().SetBold().SetFontSize(12));
                productTable.AddHeaderCell(headerCell);
            }
            foreach (var article in articles)
            {
                var articleNameCell = new Cell();
                articleNameCell.Add(new Paragraph(article.Name).SetFont(timesFont).SetFontSize(11));
                productTable.AddCell(articleNameCell);
                var articleUnitTypeCell = new Cell();
                articleUnitTypeCell.Add(new Paragraph(stringLocalizer[article.UnitType].Value).SetFont(timesFont).SetFontSize(11));
                productTable.AddCell(articleUnitTypeCell);
                var articleQuantityCell = new Cell();
                articleQuantityCell.Add(new Paragraph(article.Quantity.ToString()).SetFont(timesFont).SetFontSize(11));
                productTable.AddCell(articleQuantityCell);
                var articleUnitPriceCell = new Cell();
                articleUnitPriceCell.Add(new Paragraph(stringLocalizer["Currency", article.UnitPrice].Value).SetFont(timesFont).SetFontSize(11));
                productTable.AddCell(articleUnitPriceCell);
                var articleSumCell = new Cell();
                articleSumCell.Add(new Paragraph(stringLocalizer["Currency", ((double)article.UnitPrice * article.Quantity)].Value).SetFont(timesFont).SetFontSize(11));
                productTable.AddCell(articleSumCell);
                }




            return productTable;

        }



        private Cell CreateInfoCell(string title,string name="")
        {
            var cell = new Cell();
            cell.Add(new Paragraph(stringLocalizer[title]).SetFont(artilFont).SetItalic());
            if (!string.IsNullOrEmpty(name))
            {
                cell.Add(new Paragraph(stringLocalizer["Name"] + name).SetFont(artilFont).SetFontSize(9));
            }
            else
            {
                cell.Add(new Paragraph(stringLocalizer["Name"] + ".................").SetFont(artilFont).SetFontSize(9));
            }
            
            cell.Add(new Paragraph(stringLocalizer["Sign"] + "............").SetFont(artilFont).SetFontSize(9));
            return cell;
        }
        
    }
}
