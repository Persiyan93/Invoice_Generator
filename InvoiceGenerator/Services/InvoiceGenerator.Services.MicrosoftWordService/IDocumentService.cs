using InvoiceGenerator.Data.Models;
using System;
using System.IO;
using System.Threading.Tasks;

namespace InvoiceGenerator.Services.MicrosoftWordService
{
    public interface IDocumentService
    {

        void GenerateCompanyTemplate(string companyId);

        void GenerateInvoiceAsync(string invoiceId,  string companyId);

        FileStream GetInvoiceAsPdf(string invoiceId);
    }
}
