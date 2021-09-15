using InvoiceGenerator.Common;
using InvoiceGenerator.Services.Data;
using InvoiceGenerator.Web.Models;
using InvoiceGenerator.Web.Models.BankAccount;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace InvoiceGenerator.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BankAccountsController : ControllerBase
    {
        private readonly IBankAccountService bankAccountService;

        public BankAccountsController(IBankAccountService bankAccountService)
        {
            this.bankAccountService = bankAccountService;
        }
        
        [HttpGet]
        public  async Task<IActionResult> GetBankAccounts()
        {
            var companyId = this.User.Claims.FirstOrDefault(x => x.Type == "companyId").Value;
            var bankAccounts =await  bankAccountService.GetBankAccountsAsync<BankAccountViewModel>(companyId);
            return this.Ok(bankAccounts);
        }

      

        [HttpPost]
        public async Task<IActionResult> AddNewBankAccount(BankAccountInputModel input)
        {
            var companyId = this.User.Claims.FirstOrDefault(x => x.Type == "companyId").Value;
            await bankAccountService.AddNewBankAccountAsync(input, companyId);
            return this.Ok(new ResponseViewModel
            {
                Status = "Successffully",
                Message = SuccessMessages.BankAccountAddedsuccessfully
            });
        }

      


        [HttpDelete("{bankAccountId}")]
        public async Task<IActionResult> Delete(string bankAccountId)
        {
            var companyId = this.User.Claims.FirstOrDefault(x => x.Type == "companyId").Value;
            await bankAccountService.RemoveBankAccountAsync(bankAccountId,companyId);

            return this.Ok(new ResponseViewModel
            {
                Status = "Successffully",
                Message = SuccessMessages.SuccessfullyRemovedBankAccount
            });
        }
    }
}
