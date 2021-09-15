using InvoiceGenerator.Web.Models.BankAccount;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Services.Data
{
    public interface IBankAccountService
    {
        Task AddNewBankAccountAsync(BankAccountInputModel input, string companyId);

        Task RemoveBankAccountAsync(string bankAccountId, string companyId);

        Task<ICollection<T>> GetBankAccountsAsync<T>(string companyId);

    }
}
