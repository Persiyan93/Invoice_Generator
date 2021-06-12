using InvoiceGenerator.Web.Models.Company;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Services.Data
{
   public  interface ICompanyService
    {
        Task<string> CreateAsync(CompanyInputModel inputModel ,string userId);

        Task EditAsync();

        Task DeleteAsync();

        Task AddUser();

        Task AddClient(string clientId, string companyId);

       

             
    }
}
