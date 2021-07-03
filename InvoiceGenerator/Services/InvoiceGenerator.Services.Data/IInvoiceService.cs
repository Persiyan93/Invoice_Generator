
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
        Task<string> CreateInvoice(InvoiceInputModel invoice,string userId);

        Task<ICollection<T>> GetAllCompanyInvoices<T>(string userId);


        Task<T> GetInvoiceById<T>(string invoiceId);



        //Task<InvoiceTemplateModel> GetInvoiceInformation(string invoiceId); 

        

    }
}
