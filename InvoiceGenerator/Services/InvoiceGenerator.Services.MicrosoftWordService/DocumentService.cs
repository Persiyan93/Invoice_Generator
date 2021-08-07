using InvoiceGenerator.Services.Data;
using InvoiceGenerator.Services.MicrosoftWordService.Models;
using InvoiceGenerator.Web.Models.WordModels;
using Microsoft.Office.Interop.Word;
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Reflection;

namespace InvoiceGenerator.Services.MicrosoftWordService
{
    public class DocumentService : IDocumentService
    {
        private readonly IInvoiceService invoiceService;

        public DocumentService(IInvoiceService invoiceService)
        {
            this.invoiceService = invoiceService;
        }
      
       

        public void  GenerateInvoice(string invoiceId ,string templateName="InvoiceTemplate.docx")
        {
            var invoice = invoiceService.GetInvoiceById<InvoiceTemplateModel>(invoiceId).GetAwaiter().GetResult();
            var nameOfResultFile = "Invoice" + invoice.InvoiceNumber;
             GenerateDocument(invoice,invoiceId,templateName);

        }

        public FileStream GetInvoiceAsPdf(string invoiceId)
        {
            var documentPath = $@"D:\Invoices\{invoiceId}.pdf";
            return new FileStream(documentPath, FileMode.Open);

        }

        private void GenerateDocument(TemplateModel model, string nameOfResultFile, string templateName )
        {
            Application app = new Application();
            try
            {
                var outPutDirectory = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
                var templatePath = Path.Combine(outPutDirectory, templateName);
                Document doc = app.Documents.Open(templatePath, ReadOnly: false);
                doc.Activate();
                var bookmarks = doc.Bookmarks;
                var properties = model.GetType().GetProperties();

                foreach (var property in properties)
                {
                    var propertyType = property.PropertyType;
                    if (propertyType.Name== "ICollection`1")
                    {
                        var list = (List<ArticleToInvoiceTemplateModel>)property.GetValue(model);
                        var articlesTable = doc.Tables[2];
                        int currentRow = 2;
                        foreach (var item in list)
                        {
                            var row = articlesTable.Rows.Add();
                            row.Shading.BackgroundPatternColor = WdColor.wdColorWhite;
                            articlesTable.Rows[currentRow].Cells[1].Range.Text = item.Name;
                            articlesTable.Rows[currentRow].Cells[2].Range.Text = item.UnitType;
                            articlesTable.Rows[currentRow].Cells[3].Range.Text = item.Quantity.ToString("F2");
                            articlesTable.Rows[currentRow].Cells[4].Range.Text = item.UnitPrice.ToString("F2");
                            articlesTable.Rows[currentRow].Cells[5].Range.Text = ((double)item.UnitPrice*item.Quantity).ToString("F2");
                           
                            currentRow++;
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


                doc.ExportAsFixedFormat(OutputFileName: @$"D:\Invoices\{nameOfResultFile}", WdExportFormat.wdExportFormatPDF );
               
                
                doc.Close(SaveChanges: false);

                app.Quit();
            }
            
            finally
            {
                app.Quit();
            }
          

          
        }

        
    }
}
    