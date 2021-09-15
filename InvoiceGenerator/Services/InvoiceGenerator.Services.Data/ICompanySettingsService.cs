using InvoiceGenerator.Web.Models.Company;
using InvoiceGenerator.Web.Models.Invoices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Services.Data
{
    public interface ICompanySettingsService
    {
        Task<CompanySettingsModel> GetCompanySettingsAsync(string companyId);

        Task UpdateComapnySettingsAsync(string companyId, CompanySettingsModel input);

       

    }
}
