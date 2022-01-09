
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

        Task<string> CreateInvoiceAsync(InvoiceInputModel inputModel, string companyId, string userId);

        Task<int> UpdateStatusOfInvoicesAsync(UpdateInvoiceStatusInputModel inputModel, string companyId, string userId);

         Task<ICollection<T>> GetAllCompanyInvoicesAsync<T>(string companyId, DateTime startDate, DateTime endDate, string orderBy, string order,  int invoiceNumber,string clientName,string createdBy,string invoiceStatus);

         Task<T> GetInvoiceByIdAsync<T>(string invoiceId);

        Task<ICollection<T>> GetClientInvoicesByClientIdAsync<T>(string clientId, DateTime startDate, DateTime endDate, string orderBy, string order);

        Task UpdateStatusofOverdueInvoicesAsync();

        Task<ICollection<InvoiceEmailModel>> GetAllUnPaidInvoicesWhoseClientsShouldbeNotifiedAsync();

        Task<ICollection<InvoiceIncomesByMonthsViewModel>> GetSalesByMonthsAsync(string companyId);

        Task<DefaultInvoiceOptions> GetDefaultInvoiceOptionsAsync(string companyId);










    }
}
