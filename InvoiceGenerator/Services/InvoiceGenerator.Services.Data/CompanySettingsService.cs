using InvoiceGenerator.Common;
using InvoiceGenerator.Data;
using InvoiceGenerator.Services.Mapping;
using InvoiceGenerator.Web.Models.Company;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Services.Data
{
    public class CompanySettingsService : ICompanySettingsService
    {
        private readonly ApplicationDbContext context;

        public CompanySettingsService(ApplicationDbContext context)
        {
            this.context = context;
        }
        public async Task<CompanySettingsModel> GetCompanySettingsAsync(string companyId)
        {
            var settings = await context.CompanySettings.Where(x => x.CompanyId == companyId)
                  .To<CompanySettingsModel>()
                  .FirstOrDefaultAsync();

            return settings;
        }

        public async Task UpdateComapnySettingsAsync(string companyId, CompanySettingsModel input)
        {
            var settings = await context.CompanySettings.FirstOrDefaultAsync(x => x.CompanyId == companyId);

            settings.DefaultPaymentTerm = input.DefaultPaymentTerm;
            settings.PeriodInDaysBetweenTwoRepatedEmails = input.PeriodInDaysBetweenTwoRepatedEmails;
            settings.SendAutomaticGeneratedEmails = input.SendAutomaticGeneratedEmails;
            settings.BlockClientWhenReachMaxCountOfUnpaidInvoices = input.BlockClient;
            settings.MaxCountOfUnPaidInvoices = input.MaxCountOfUnPaidInvoices;
            settings.DefaultInvoiceLanguage = input.DefaultInvoiceLanguage;
            var bankAccount =await context.BankAccounts.FirstOrDefaultAsync(x => x.Id == input.DefaultInvoiceBankAccountId && x.IsActive && companyId == x.CompanyId);
            if (bankAccount != null)
            {
                settings.DefaultInvoiceBankAccountId = bankAccount.Id;
            }
           

           await context.SaveChangesAsync();
            
            
        }
    }
}
