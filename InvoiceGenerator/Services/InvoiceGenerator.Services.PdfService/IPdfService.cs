using InvoiceGenerator.Services.PdfService.Enum;
using System;
using System.Threading.Tasks;

namespace InvoiceGenerator.Services.PdfService
{
    public interface IPdfService
    {
        Task GenerateInvoicePdf(string invoiceId, InvoiceLanguage language);
    }
}
