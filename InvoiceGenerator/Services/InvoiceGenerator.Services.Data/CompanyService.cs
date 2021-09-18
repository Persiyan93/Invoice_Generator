
using InvoiceGenerator.Common;
using InvoiceGenerator.Common.Resources;
using InvoiceGenerator.Data;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Data.Models.Enum;
using InvoiceGenerator.Services.Mapping;
using InvoiceGenerator.Web.Models.Company;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace InvoiceGenerator.Services.Data
{
    public class CompanyService : ICompanyService
    {
        private readonly ApplicationDbContext context;
        private readonly IAddressService addressService;
        private readonly IStringLocalizer<Messages> stringLocalizer;

        public CompanyService(ApplicationDbContext context, IAddressService addressService,IStringLocalizer<Messages>stringLocalizer)
        {
            this.context = context;
            this.addressService = addressService;
            this.stringLocalizer = stringLocalizer;
        }



        public async Task<string> CreateAsync(CompanyInputModel inputModel, string userId)
        {
            var companyFromDb = await context.RegisteredCompanies.FirstOrDefaultAsync(x => x.VatNumber == inputModel.VatNumber);
            if (companyFromDb != null)
            {
                throw new InvalidUserDataException(stringLocalizer["CompanyAlreadyExist",inputModel.VatNumber].Value);
            }

            var company = new RegisteredCompany
            {
                Name = inputModel.CompanyName,
                VatNumber = inputModel.VatNumber,
                CompanyType = inputModel.CompanyType,
                AdministratorId = userId,
            };
            if (inputModel.AccontablePersonName != null)
            {
                company.AccontablePersonName = inputModel.AccontablePersonName;
            }
            if (inputModel.UniqueIdentificationNumber!=null)
            {
                company.UniqueIdentificationNumber = inputModel.UniqueIdentificationNumber;
            }
            
            var addressId = await addressService.AddFullAddressAsync(inputModel.Address);
            var defaultOptions = new CompanySettings
            {
                CompanyId = company.Id,
                BlockClientWhenReachMaxCountOfUnpaidInvoices = false,
                SendAutomaticGeneratedEmails = false,
                PeriodInDaysBetweenTwoRepatedEmails = 5,
                DefaultPaymentTerm = 45,
                DefaultInvoiceLanguage = Language.bg

            };
            await context.CompanySettings.AddAsync(defaultOptions);
            company.DefaultInvoiceOptinsId = defaultOptions.Id;
            company.AddressId = addressId;
            await context.RegisteredCompanies.AddAsync(company);
            await context.SaveChangesAsync();
            return company.Id;



        }

        public Task EditCompanyInfoAsync(CompanyInputModel inputModel)
        {
            throw new NotImplementedException();
        }

        public async Task<T> GetCompanyInfoAsync<T>(string companyId)
        {
            var company = await context.RegisteredCompanies
                 .Where(x => x.Id == companyId && x.IsActive == true)
                 .To<T>()
                 .FirstOrDefaultAsync();

            return company;


        }
    }
}
