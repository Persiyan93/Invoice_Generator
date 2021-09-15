using InvoiceGenerator.Common;
using InvoiceGenerator.Common.Exceptions;
using InvoiceGenerator.Data;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Services.Mapping;
using InvoiceGenerator.Web.Models.BankAccount;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Services.Data
{
    public class BankAccountService : IBankAccountService

    {
        private readonly ApplicationDbContext context;

        public BankAccountService(ApplicationDbContext context)
        {
            this.context = context;
        }
        public async Task AddNewBankAccountAsync(BankAccountInputModel input, string companyId)
        {
            var bankAccount = await context.BankAccounts.FirstOrDefaultAsync(x => x.Iban == input.Iban && x.IsActive);
            if (bankAccount!=null)
            {
                throw new InvalidUserDataException(string.Format(ErrorMessages.BankAccountExist, input.Iban));
            }
            var company =  await context.RegisteredCompanies.FirstOrDefaultAsync(x => x.Id == companyId);
            if (company==null)
            {
                throw new PermissionException(ErrorMessages.DontHavePermission);
            }
            bankAccount = new BankAccount
            {
                AccountName = input.NameOfAccount,
                BankName = input.BankName,
                BicCode = input.BicCode,
                Iban = input.Iban,
                IsActive = true,
                CompanyId = companyId,

            };
            await context.BankAccounts.AddAsync(bankAccount);
            await context.SaveChangesAsync();
        }

        public async Task<ICollection<T>> GetBankAccountsAsync<T>(string companyId)
        {
            var bankAccounts = await context.BankAccounts
                .Where(x => x.CompanyId == companyId && x.IsActive)
                .AsNoTracking()
                .To<T>()
                .ToListAsync();
               

            return bankAccounts;
        }

        public  async Task RemoveBankAccountAsync(string bankAccountId, string companyId)
        {
            var bankAccount = await  context.BankAccounts
                .FirstOrDefaultAsync(x => x.CompanyId == companyId && x.Id == bankAccountId);
            if (bankAccount==null)
            {
                throw new InvalidUserDataException(ErrorMessages.BankAccountDoesNotExist);
            }
            bankAccount.IsActive = false;
            await context.SaveChangesAsync();
        }
    }
}
