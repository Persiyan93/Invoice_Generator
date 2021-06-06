
using InvoiceGenerator.Common;
using InvoiceGenerator.Data;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Web.Models.Company;
using Microsoft.EntityFrameworkCore;
using System;
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

      

        public async Task CreateAsync(CompanyInputModel inputModel)
        {
            var company = await context.Companies.FirstOrDefaultAsync(x => x.VatNumber == inputModel.VatNumber);
            if (company!=null)
            {
                throw new InvalidUserDataException(ErrorMessages.CompanyAlreadyExist);
            }
            company = new RegisteredCompany
            {
                Name=inputModel.Name,
                VatNumber=inputModel.VatNumber,
                CompanyType=inputModel.CompanyType,

                
            };
            var addressId = await addressService.AddFullAddress(inputModel.Address);
            company.AddressId = addressId;
            await context.Companies.AddAsync(company);
            await context.SaveChangesAsync();



        }
        public Task AddUser()
        {
            throw new NotImplementedException();
        }

        public Task DeleteAsync()
        {
            throw new NotImplementedException();
        }

        public Task EditAsync()
        {
            throw new NotImplementedException();
        }
    }
}
