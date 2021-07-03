using InvoiceGenerator.Data.Models;
using System;
using System.Threading.Tasks;

namespace InvoiceGenerator.Services.MicrosoftWordService
{
    public interface IDocumentService
    {
      

        void GenerateInvoice(string invoiceId, string templatePath);
    }
}
