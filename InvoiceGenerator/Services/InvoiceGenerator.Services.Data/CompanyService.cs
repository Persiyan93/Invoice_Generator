
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
                .FirstOrDefaultAsync(x => x.VatNumber == inputModel.VatNumber);
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
            var addressId = await addressService.AddFullAddress(inputModel.Address);
            company.AddressId = addressId;
            await context.Companies.AddAsync(company);
            await context.SaveChangesAsync();
            return company.Id;



        }
        public async  Task AddUser(string userId,string companyId)
        {
            var company = await  context.RegisteredCompanies
                .FirstOrDefaultAsync(x => x.Id == companyId);
            if (company==null)
            {
                throw new InvalidUserDataException(string.Format(ErrorMessages.CompanyWithSuchIdDoesNotExist,companyId));
            }
            var user =await   context.Users.FirstOrDefaultAsync(x => x.Id == userId);
            if (user==null)
            {
                throw new InvalidUserDataException(string.Format(ErrorMessages.UserWithSuchIdDoesNotExist, userId));
            }
            company.Users.Add(user);
            await  context.SaveChangesAsync();
        }

        public Task DeleteAsync()
        {
            throw new NotImplementedException();
        }

        public Task EditAsync()
        {
            throw new NotImplementedException();
        }

        public async  Task AddClient(string clientId, string companyId)
        {
            var company = await context.RegisteredCompanies
                .FirstOrDefaultAsync(x => x.Id == companyId);
            if (company==null)
            {
                throw new InvalidUserDataException(string.Format(ErrorMessages.CompanyWithSuchIdDoesNotExist,companyId));
            }

            var client = await  context.Clients
                .FirstOrDefaultAsync(x => x.Id == clientId);

            if (client==null)
            {
                throw new InvalidUserDataException(string.Format(ErrorMessages.CompanyWithSuchIdDoesNotExist, clientId));
            }

            company.Clients.Add(client);
            await context.SaveChangesAsync();

        }
    }
}
