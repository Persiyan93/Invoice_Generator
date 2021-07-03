
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

      

        public async Task<string> CreateAsync(CompanyInputModel inputModel ,string userId)
        {
            var company = await context.RegisteredCompanies
                .FirstOrDefaultAsync(x => x.VatNumber == inputModel.VatNumber && x.IsActive==true);
            if (company!=null)
            {
                throw new InvalidUserDataException(ErrorMessages.CompanyAlreadyExist);
            }
            var user = await context.Users.FirstOrDefaultAsync(x => x.Id == userId);
            if (user.CompanyId!=null)
            {
                throw new InvalidUserDataException(ErrorMessages.UserExistInAnotherCompany);
            }
            company = new RegisteredCompany
            {
                Name = inputModel.Name,
                VatNumber = inputModel.VatNumber,
                CompanyType = inputModel.CompanyType,
                AdministratorId = userId

                
            };
            var addressId = await addressService.AddFullAddressAsync(inputModel.Address);
            company.AddressId = addressId;
            company.Users.Add(user);
            await context.RegisteredCompanies.AddAsync(company);
            await context.SaveChangesAsync();
            return company.Id;



        }

        public Task EditCompanyInfoAsync(CompanyInputModel inputModel)
        {
            throw new NotImplementedException();
        }

        public Task<T> GetCompanyInfoAsync<T>(string companyId)
        {
            throw new NotImplementedException();
        }
    }
}
