using InvoiceGenerator.Data.Models;
using System;
using System.IO;
using System.Threading.Tasks;

namespace InvoiceGenerator.Services.MicrosoftWordService
{
    public interface IDocumentService
    {
      

        void GenerateInvoice(string invoiceId,   string templatePath= "InvoiceTemplate.docx");

        FileStream GetInvoiceAsPdf(string invoiceId);
    }
}
