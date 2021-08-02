
using InvoiceGenerator.Web.Models.Invoices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Services.Data
{
   public  interface IInvoiceService
    {
        Task<string> SaveInvoiceTemporary(TempInvoiceModel inputModel, string companyId,string userId);

        Task<string> CreateInvoice(InvoiceInputModel invoice,string userId);

        Task<string> AddInvoice(InvoiceInputModel inputModel,string companyId,string userId);

        Task<ICollection<T>> GetAllCompanyInvoices<T>(string companyId);

         Task<T> GetInvoiceById<T>(string invoiceId);

        Task GenerateInvoiceInPdfFormat(string invoiceId);
      



        //Task<InvoiceTemplateModel> GetInvoiceInformation(string invoiceId); 

        

    }
}
