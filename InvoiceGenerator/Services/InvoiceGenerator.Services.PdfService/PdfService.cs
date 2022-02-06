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
using iText.IO.Font.Constants;
using iText.Forms.Fields;
using System.Reflection;

namespace InvoiceGenerator.Services.PdfService
{
    public class PdfService : IPdfService
    {


        private readonly IInvoiceService invoiceService;
        private readonly IStringLocalizer<InvoicePdfResource> stringLocalizer;

        private static string arialFontFileName = Path.Combine(Path.GetDirectoryName(Assembly.GetEntryAssembly().Location), @"fonts\arial.ttf");
        private static string cambriaFontFileName = Path.Combine(Path.GetDirectoryName(Assembly.GetEntryAssembly().Location), @"fonts\arial.ttf");
        private static string timesfontFileName = Path.Combine(Path.GetDirectoryName(Assembly.GetEntryAssembly().Location), @"fonts\arial.ttf");
        private PdfFont artilFont;
        private PdfFont cambriaFont;
        private PdfFont timesFont;


        public PdfService(IInvoiceService invoiceService, IStringLocalizer<InvoicePdfResource> stringLocalizer)
        {

            this.invoiceService = invoiceService;
            this.stringLocalizer = stringLocalizer;
            this.artilFont = PdfFontFactory.CreateFont(arialFontFileName, iText.IO.Font.PdfEncodings.IDENTITY_H);
            this.cambriaFont = PdfFontFactory.CreateFont(cambriaFontFileName, iText.IO.Font.PdfEncodings.IDENTITY_H);
            this.timesFont = PdfFontFactory.CreateFont(timesfontFileName, iText.IO.Font.PdfEncodings.IDENTITY_H);
        }

        public async Task<byte[]> GenerateInvoicePdf(string invoiceId)
        {
            var invoice = await invoiceService.GetInvoiceByIdAsync<InvoiceTemplateModel>(invoiceId);
            var pdfAsByteArray = GenerateInvoiceDocument(invoice);
            return pdfAsByteArray;
        }

        private byte[] GenerateInvoiceDocument(InvoiceTemplateModel invoice)
        {
            byte[] buffer;
            using (var memoryStream = new MemoryStream())
            {
                var myColor = new DeviceRgb(187, 191, 190);
                using (var pdfWriter = new PdfWriter(memoryStream))
                {
                    PdfDocument pdf = new PdfDocument(pdfWriter);
                    Document document = new Document(pdf);


                    //Set Initial margin
                    document.SetTopMargin(50);

                    //Create invoice header table which contains invoice number,invoice issue data 
                    var invoiceHeaderTable = new Table(3).UseAllAvailableWidth();
                    var issueDateCell = new Cell().SetTextAlignment(TextAlignment.RIGHT);
                    var invoiceNumberCell = new Cell().SetTextAlignment(TextAlignment.LEFT);
                    var invoiceTitelCell = new Cell().SetTextAlignment(TextAlignment.CENTER).SetMinWidth(150);
                    invoiceNumberCell.Add(new Paragraph("№" + invoice.InvoiceNumber.ToString("D10")).SetFont(timesFont).SetFontSize(10));
                    invoiceTitelCell.Add(new Paragraph(stringLocalizer["Invoice"]).SetFont(timesFont).SetFontSize(13).SetBold());
                    issueDateCell.Add(new Paragraph(stringLocalizer["IssueDate", invoice.IssueDate]).SetFont(timesFont).SetFontSize(10));
                    invoiceHeaderTable.AddCell(invoiceNumberCell)
                        .AddCell(invoiceTitelCell)
                        .AddCell(issueDateCell);
                    document.Add(invoiceHeaderTable);


                    var companiesInfoTable = new Table(2).UseAllAvailableWidth();

                    //Add Buyer
                    var buyerCompanyCell = CreateCompanyinfoCell("Buyer", invoice.ClientCompanyName
                                                            , invoice.ClientAddress, invoice.ClientUniqueIdentificationNumber
                                                            , invoice.ClientVatNumber, invoice.ClientAccontablePersonName)
                            .SetMaxWidth(250)
                            .SetBackgroundColor(myColor)
                            .SetBorderBottom(Border.NO_BORDER);
                    companiesInfoTable.AddCell(buyerCompanyCell);


                    //Add Seller 
                    var sellerCompanyCell = CreateCompanyinfoCell("Seller", invoice.SellerCompanyName
                                    , invoice.SellerAddress, invoice.SellerUniqueIdentificationNumber
                                    , invoice.SellerVatNumber, invoice.SellerAccontablePersonName)
                        .SetMaxWidth(250)
                        .SetBackgroundColor(myColor)
                        .SetBorderBottom(Border.NO_BORDER);
                    companiesInfoTable.AddCell(sellerCompanyCell);

                    document.Add(companiesInfoTable);


                    var productsTable = CreateProductTable(invoice.Services, invoice.Articles);



                    //Add Empty cell

                    var emptyCell = new Cell(1, 2);
                    productsTable.AddCell(emptyCell);

                    //Add info cell which contain name of  net price
                    var infoCell = new Cell(1, 2);
                    infoCell.Add(new Paragraph(stringLocalizer["PriceWithoutVat"]));
                    infoCell.Add(new Paragraph(stringLocalizer["VatRate", invoice.VatRate]));
                    infoCell.Add(new Paragraph(stringLocalizer["WholePrice"]));
                    infoCell.SetFont(timesFont)
                        .SetFontSize(8)
                        .SetMarginTop(5)
                        .SetTextAlignment(TextAlignment.RIGHT)
                        .SetBackgroundColor(myColor);

                    productsTable.AddCell(infoCell);

                    //Add cell with final  net price of invoice ,vat rate and total price 
                    var finalPriceCell = new Cell();
                    finalPriceCell.Add(new Paragraph(stringLocalizer["Currency", invoice.PriceWithoutVat]));
                    finalPriceCell.Add(new Paragraph(stringLocalizer["Currency", invoice.VatValue]));
                    finalPriceCell.Add(new Paragraph(stringLocalizer["Currency", invoice.InvoicePrice]));
                    finalPriceCell.SetFont(timesFont)
                        .SetFontSize(8)
                        .SetMarginTop(5)
                        .SetTextAlignment(TextAlignment.RIGHT)
                        .SetBackgroundColor(myColor);
                    productsTable.AddCell(finalPriceCell);


                    //If invoice with zero vat rate add aditional row in table
                    if (invoice.IsWithZeroVatRate)
                    {
                        var isInvoiceWithZeroVatRateCell = new Cell();
                        var testcheckBox = PdfFontFactory.CreateFont(StandardFonts.ZAPFDINGBATS);
                        var chunk = new Text("4").SetFont(testcheckBox).SetFontSize(9);
                        var testParagraph = new Paragraph(new Text(stringLocalizer["ZeroVatRate"]).SetFont(timesFont)).Add(chunk);

                        isInvoiceWithZeroVatRateCell.Add(testParagraph);
                        productsTable.AddCell(isInvoiceWithZeroVatRateCell);

                        var reasonForInvoiceWithZeroVatRateCell = new Cell(1, 4);
                        var zeroVatRateParagraph = new Paragraph(stringLocalizer["ReasonForZeroVatRate", invoice.ReazonForZeroVatRate])
                            .SetFont(timesFont)
                            .SetFontSize(9);
                        reasonForInvoiceWithZeroVatRateCell.Add(zeroVatRateParagraph);
                        productsTable.AddCell(reasonForInvoiceWithZeroVatRateCell);
                    }


                    document.Add(productsTable);



                    var additionalInfoTable = new Table(3).UseAllAvailableWidth();
                    //Add Recipient Cell
                    var recipientCell = CreateInfoCell("InvoiceRecepient", 1, 1).SetBorderTop(Border.NO_BORDER);
                    additionalInfoTable.AddCell(recipientCell);


                    //Add Payment Method  Cell with Seller Bank Info
                    var paymentMethodCell = new Cell().SetBorderTop(Border.NO_BORDER);
                    paymentMethodCell.SetMinWidth(150);
                    paymentMethodCell
                        .Add(new Paragraph(stringLocalizer["PaymentMethodName"] + stringLocalizer[invoice.MethodOfPayment]))
                        .SetFont(artilFont).SetFontSize(10);
                    if (invoice.MethodOfPayment == "BankTransfer")
                    {
                        paymentMethodCell
                               .Add(new Paragraph("Bank: " + $"{invoice.BankAccount.BankName}")
                               .SetFont(artilFont).SetFontSize(10));
                        paymentMethodCell
                                   .Add(new Paragraph("BIC: " + $"{invoice.BankAccount.BicCode}")
                                   .SetFont(artilFont).SetFontSize(10));
                        paymentMethodCell
                                  .Add(new Paragraph("IBAN: " + $"{invoice.BankAccount.Iban}")
                                   .SetFont(artilFont).SetFontSize(10));
                    }

                    additionalInfoTable.AddCell(paymentMethodCell);

                    //Add Creator Cell
                    var createByCell = CreateInfoCell("CreatedBy", 1, 1, invoice.CreatedBy).SetBorderTop(Border.NO_BORDER); ;
                    additionalInfoTable.AddCell(createByCell);


                    document.Add(additionalInfoTable);

                    var issueInfoTable = new Table(2).UseAllAvailableWidth();
                    var placeOfPublishingCell = new Cell()
                        .SetFont(timesFont)
                        .SetFontSize(9)
                        .SetBorderTop(Border.NO_BORDER);
                    placeOfPublishingCell
                        .Add(new Paragraph(stringLocalizer["PlaceOfPublishing", invoice.PlaceOfPublishing]));
                    issueInfoTable.AddCell(placeOfPublishingCell);

                    var dateOfTaxEventCell = new Cell()
                        .SetTextAlignment(TextAlignment.RIGHT)
                        .SetFont(timesFont).SetFontSize(9)
                        .SetBorderTop(Border.NO_BORDER);
                    dateOfTaxEventCell
                        .Add(new Paragraph(stringLocalizer["DateOfTaxEvent", invoice.DateOfTaxEvent]));
                    issueInfoTable.AddCell(dateOfTaxEventCell);

                    document.Add(issueInfoTable);

                    document.Close();
                }
                buffer = memoryStream.ToArray();

            }
            return buffer;

        }

        private Cell CreateCompanyinfoCell(string companyRole, string companyName, string companyAddress
                         , string uniqueIdentificationNumber, string vatNumber, string accountablePersonName)
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

            //Set ACcountable person
            if (accountablePersonName != null)
            {
                var accountablePersonParagraph = new Paragraph();
                accountablePersonParagraph.Add(new Text(stringLocalizer["AccountablePerson"].Value).SetBold());
                accountablePersonParagraph.Add(accountablePersonName)
                    .SetFont(timesFont).SetFontSize(9);
                cell.Add(accountablePersonParagraph);
            }

            return cell;
        }

        private Table CreateProductTable(ICollection<ServiceToInvoiceTemplateModel> services, ICollection<ArticleToInvoiceTemplateModel> articles)
        {
            var productTable = new Table(5);
            productTable.UseAllAvailableWidth();
            string[] headerTittles = { "ProductName", "UnitType", "Quantity", "UnitPrice", "Price" };


            foreach (var headerTittle in headerTittles)
            {
                var headerCell = new Cell();

                headerCell.Add(new Paragraph(stringLocalizer[headerTittle]).SetFont(cambriaFont).SetItalic().SetBold().SetFontSize(11));
                productTable.AddHeaderCell(headerCell);
            }
            foreach (var article in articles)
            {
                var articleNameCell = new Cell().SetMinWidth(200);
                articleNameCell.Add(new Paragraph(article.Name).SetFont(timesFont).SetFontSize(9));
                productTable.AddCell(articleNameCell);

                var articleUnitTypeCell = new Cell().SetTextAlignment(TextAlignment.RIGHT);
                articleUnitTypeCell.Add(new Paragraph(stringLocalizer[article.UnitType].Value).SetFont(timesFont).SetFontSize(9));
                productTable.AddCell(articleUnitTypeCell);

                var articleQuantityCell = new Cell().SetTextAlignment(TextAlignment.RIGHT).SetMaxWidth(40);
                articleQuantityCell.Add(new Paragraph(article.Quantity.ToString()).SetFont(timesFont).SetFontSize(9));
                productTable.AddCell(articleQuantityCell);

                var articleUnitPriceCell = new Cell().SetMinWidth(20).SetTextAlignment(TextAlignment.RIGHT); ;
                articleUnitPriceCell.Add(new Paragraph(stringLocalizer["Currency", article.UnitPrice].Value).SetFont(timesFont)
                                                .SetFontSize(9));
                productTable.AddCell(articleUnitPriceCell);

                var articleSumCell = new Cell().SetTextAlignment(TextAlignment.RIGHT); ;
                articleSumCell.Add(new Paragraph(stringLocalizer["Currency", ((double)article.UnitPrice * article.Quantity)].Value).SetFont(timesFont).SetFontSize(11));
                productTable.AddCell(articleSumCell);
            }

            foreach (var service in services)
            {
                var serviceNameCell = new Cell().SetMinWidth(200);
                serviceNameCell.Add(new Paragraph(service.Name).SetFont(timesFont).SetFontSize(9));
                productTable.AddCell(serviceNameCell);

                var serviceUnitTypeCell = new Cell().SetTextAlignment(TextAlignment.RIGHT);
                productTable.AddCell(serviceUnitTypeCell);

                var serviceQuantityCell = new Cell().SetTextAlignment(TextAlignment.RIGHT).SetMaxWidth(40);
                serviceQuantityCell.Add(new Paragraph(service.Quantity.ToString()).SetFont(timesFont).SetFontSize(9));
                productTable.AddCell(serviceQuantityCell);

                var serviceUnitPriceCell = new Cell().SetMinWidth(20).SetTextAlignment(TextAlignment.RIGHT);
                serviceUnitPriceCell.Add(new Paragraph(stringLocalizer["Currency", service.UnitPrice]).SetFont(timesFont)
                                                .SetFontSize(9));
                productTable.AddCell(serviceUnitPriceCell);

                var serviceSumCell = new Cell().SetTextAlignment(TextAlignment.RIGHT); ;
                serviceSumCell.Add(new Paragraph(stringLocalizer["Currency", ((double)service.UnitPrice * service.Quantity).ToString("0,00")]).SetFont(timesFont).SetFontSize(11));
                productTable.AddCell(serviceSumCell);
            }




            return productTable;

        }



        private Cell CreateInfoCell(string title, int rowSpan, int colSpan, string name = "")
        {
            var cell = new Cell(rowSpan, colSpan);
            cell.Add(new Paragraph(stringLocalizer[title]).SetFont(artilFont).SetItalic());
            if (!string.IsNullOrEmpty(name))
            {
                cell.Add(new Paragraph(stringLocalizer["Name"] + name).SetFont(artilFont).SetFontSize(9));
            }
            else
            {
                cell.Add(new Paragraph(stringLocalizer["Name"] + new string('.', 30)).SetFont(artilFont).SetFontSize(9));
            }

            cell.Add(new Paragraph(stringLocalizer["Sign"] + new string('.', 30)).SetFont(artilFont).SetFontSize(9));
            return cell;
        }

    }
}
