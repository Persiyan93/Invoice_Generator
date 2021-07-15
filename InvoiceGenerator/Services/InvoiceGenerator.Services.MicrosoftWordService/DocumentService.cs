using InvoiceGenerator.Services.Data;
using InvoiceGenerator.Services.MicrosoftWordService.Models;
using Microsoft.Office.Interop.Word;
using System;

using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Services.MicrosoftWordService
{
    public class DocumentService : IDocumentService
    {
        private readonly IInvoiceService invoiceService;

        public DocumentService(IInvoiceService invoiceService)
        {
            this.invoiceService = invoiceService;
        }
        public void FillTemplate(string templatePath)
        {
            Application app = new Application();
            Document doc = app.Documents.Open("faktura-356.docx",ReadOnly:false);
            doc.Activate();
            var bookmarks = doc.Bookmarks;
            foreach (var bookmark in bookmarks)
            {
                Console.WriteLine(bookmark.ToString());
            }
        }

        public void  GenerateInvoice(string templatePath,string invoiceId)
        {
            var invoice = invoiceService.GetInvoiceById<InvoiceTemplateModel>(invoiceId).GetAwaiter().GetResult();
             GenerateDocument(invoice);

        }

        private void GenerateDocument(TemplateModel model, string templatePath = "faktura-356.docx")
        {
            Application app = new Application();
            Document doc = app.Documents.Open(templatePath, ReadOnly: false);
            doc.Activate();
            var bookmarks = doc.Bookmarks;
            var properties = model.GetType().GetProperties();

            foreach (var property in properties)
            {

                doc.Bookmarks[property.Name].Select();
                var propertyValue = property.GetValue(model);
                if (propertyValue.GetType()==typeof(string))
                {
                    app.Selection.TypeText(propertyValue.ToString());
                }
                
            }
            doc.SaveAs2("test22", WdSaveFormat.wdFormatPDF);

            app.Quit();

          
        }

        
    }
}
    