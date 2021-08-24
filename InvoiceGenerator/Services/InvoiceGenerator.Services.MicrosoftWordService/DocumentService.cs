using InvoiceGenerator.Services.CloadStorageService;
using InvoiceGenerator.Services.Data;
using InvoiceGenerator.Services.MicrosoftWordService.Models;
using InvoiceGenerator.Web.Models.WordModels;
using Microsoft.Office.Interop.Word;
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Threading.Tasks;

namespace InvoiceGenerator.Services.MicrosoftWordService
{
    public class DocumentService : IDocumentService
    {
        private readonly IInvoiceService invoiceService;
        private readonly ICompanyService companyService;
        private readonly IDropBoxService dropBoxService;

        public DocumentService(IInvoiceService invoiceService,ICompanyService companyService,IDropBoxService dropBoxService)
        {
            this.invoiceService = invoiceService;
            this.companyService = companyService;
            this.dropBoxService = dropBoxService;
        }

        public async void GenerateCompanyTemplate(string companyId)
        {
            string templateName = "InvoiceTemplate.docx";
            var outPutDirectory = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            var templatePath = Path.Combine(outPutDirectory, templateName);
            var company= await companyService.GetCompanyInfoAsync<CompanyTemplateModel>(companyId);
           GenerateDocument(company, companyId, templatePath, SaveAs.WordDocument);



        }

        public void GenerateInvoiceAsync(string invoiceId ,string companyId)
        {
          
            var templateName = @$"D:Invoices\Templates\{companyId}.docx";
           
            var invoice = invoiceService.GetInvoiceByIdAsync<InvoiceTemplateModel>(invoiceId).GetAwaiter().GetResult();
             GenerateDocument(invoice,invoiceId, templateName,SaveAs.PdfDocument);


        }

        public FileStream GetInvoiceAsPdf(string invoiceId)
        {
            var documentPath = $@"D:\Invoices\{invoiceId}.pdf";
            return new FileStream(documentPath, FileMode.Open);

        }

        private void GenerateDocument(TemplateModel model, string nameOfResultFile, string templateName,SaveAs format )
        {
            Application app = new Application();
            lock (app)
            {
                try
                {

                   
                    Document doc = app.Documents.Open(templateName, ReadOnly: false);

                    doc.Activate();
                    var bookmarks = doc.Bookmarks;
                    var properties = model.GetType().GetProperties();
                    var productsTable = doc.Tables[2];
                    int currentRow = 2;
                    foreach (var property in properties)
                    {
                       
                        var propertyName = property.Name;
                        var propertyType = property.PropertyType;
                        if (propertyName=="Articles")
                        {
                            var list = (List<ArticleToInvoiceTemplateModel>)property.GetValue(model);
                         
                            foreach (var item in list)
                            {
                                var row = productsTable.Rows.Add();
                                row.Shading.BackgroundPatternColor = WdColor.wdColorWhite;
                                productsTable.Rows[currentRow].Cells[1].Range.Text = item.Name;
                                productsTable.Rows[currentRow].Cells[2].Range.Text = item.UnitType;
                                productsTable.Rows[currentRow].Cells[3].Range.Text = item.Quantity.ToString("F2");
                                productsTable.Rows[currentRow].Cells[4].Range.Text = item.UnitPrice.ToString("F2");
                                productsTable.Rows[currentRow].Cells[5].Range.Text = ((double)item.UnitPrice * item.Quantity).ToString("F2");

                                currentRow += 1;
                            }
                            continue;
                        }
                        else if(propertyName == "Services")
                        {
                            var list = (List<ServiceToInvoiceTemplateModel>)property.GetValue(model);

                            foreach (var item in list)
                            {
                                var row = productsTable.Rows.Add();
                                row.Shading.BackgroundPatternColor = WdColor.wdColorWhite;
                                productsTable.Rows[currentRow].Cells[1].Range.Text = item.Name;
                                productsTable.Rows[currentRow].Cells[2].Range.Text = item.UnitType;
                                productsTable.Rows[currentRow].Cells[3].Range.Text = item.Quantity.ToString("F2");
                                productsTable.Rows[currentRow].Cells[4].Range.Text = item.UnitPrice.ToString("F2");
                                productsTable.Rows[currentRow].Cells[5].Range.Text = ((double)item.UnitPrice * item.Quantity).ToString("F2");

                                currentRow += 1;
                            }
                            continue;
                        }
                        doc.Bookmarks[property.Name].Select();
                        var propertyValue = property.GetValue(model);
                        if (propertyValue == null)
                        {
                            continue;
                        }
                        if (propertyValue.GetType() == typeof(string))
                        {
                            app.Selection.TypeText(propertyValue.ToString());
                        }

                    }
                    if (format == SaveAs.PdfDocument)
                    {
                        doc.ExportAsFixedFormat(OutputFileName: @$"D:\Invoices\{nameOfResultFile}", WdExportFormat.wdExportFormatPDF);



                    }
                    else
                    {
                        doc.SaveAs2(@$"D:\Invoices\Templates\{nameOfResultFile}", FileFormat: WdSaveFormat.wdFormatDocumentDefault);
                    }

                    doc.Close(SaveChanges: false);



                }

                finally
                {
                    app.Quit();
                }


            }



        }

        
    }
}
    