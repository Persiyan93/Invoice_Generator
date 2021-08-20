
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

        Task EditInvoiceAsync(InvoiceInputModel invoice, string userId, string invoiceId);

        Task<string> AddInvoiceAsync(InvoiceInputModel inputModel, string companyId, string userId);

        Task UpdateStatusOfInvoicesAsync(UpdateInvoiceStatusInputModel inputModel, string companyId, string userId);

         Task<ICollection<T>> GetAllCompanyInvoicesAsync<T>(string companyId, DateTime startDate, DateTime endDate, string orderBy, string order,  string filterString);

         Task<T> GetInvoiceByIdAsync<T>(string invoiceId);

        Task<ICollection<T>> GetClientInvoicesByClientIdAsync<T>(string clientId, DateTime startDate, DateTime endDate, string orderBy, string order);

        Task UpdateStatusofOverdueInvoicesAsync();

        Task<ICollection<InvoiceEmailModel>> GetAllUnPaidInvoicesWhoseClientsShouldbeNotifiedAsync();
      



        
        


    }
}
