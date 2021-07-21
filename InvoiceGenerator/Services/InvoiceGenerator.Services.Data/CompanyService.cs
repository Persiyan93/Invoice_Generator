
using InvoiceGenerator.Common;
using InvoiceGenerator.Data;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Services.Mapping;
using InvoiceGenerator.Web.Models.Company;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace InvoiceGenerator.Services.Data
{
    public class CompanyService:ICompanyService
    {
        private readonly ApplicationDbContext context;
        private readonly IAddressService addressService;

        public CompanyService(ApplicationDbContext context,IAddressService addressService)
        {
            this.context = context;
            this.addressService = addressService;
        }

      

        public async Task<string> CreateAsync(CompanyInputModel inputModel ,string userId)
        {
            
            var company = new RegisteredCompany
            {
                Name = inputModel.CompanyName,
                VatNumber = inputModel.VatNumber,
                CompanyType = inputModel.CompanyType,
                AdministratorId = userId

                
            };
            var addressId = await addressService.AddFullAddressAsync(inputModel.Address);
            company.AddressId = addressId;
            await context.RegisteredCompanies.AddAsync(company);
            await context.SaveChangesAsync();
            return company.Id;



        }

        public Task EditCompanyInfoAsync(CompanyInputModel inputModel)
        {
            throw new NotImplementedException();
        }

        public async  Task<T> GetCompanyInfoAsync<T>(string companyId)
        {
            var company =  await context.RegisteredCompanies
                 .Where(x => x.Id == companyId && x.IsActive == true)
                 .To<T>()
                 .FirstOrDefaultAsync();

            return company;

                
        }
    }
}
