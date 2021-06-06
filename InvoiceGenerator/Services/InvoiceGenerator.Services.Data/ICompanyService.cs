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
        Task CreateAsync(CompanyInputModel inputModel);

        Task EditAsync();

        Task DeleteAsync();

        Task AddUser();


    }
}
