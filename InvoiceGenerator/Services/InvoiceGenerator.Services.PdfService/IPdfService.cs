using InvoiceGenerator.Services.PdfService.Enum;
using System;
using System.Threading.Tasks;

namespace InvoiceGenerator.Services.PdfService
{
    public interface IPdfService
    {
        Task<byte[]> GenerateInvoicePdf(string invoiceId);
    }
}
