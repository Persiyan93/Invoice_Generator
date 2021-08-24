using InvoiceGenerator.Common;
using InvoiceGenerator.Services.Data;
using InvoiceGenerator.Web.Models;
using InvoiceGenerator.Web.Models.Company;
using Microsoft.AspNetCore.Authorization;
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
    [Authorize]
    public class CompanySettingsController : ControllerBase
    {
        private readonly ICompanySettingsService settingsService;

        public CompanySettingsController(ICompanySettingsService settingsService)
        {

            this.settingsService = settingsService;
        }

        [HttpGet]

        public async Task<IActionResult> Get()
        {
            var companyId = this.User.Claims.FirstOrDefault(x => x.Type == "companyId").Value;
            var settings = await settingsService.GetCompanySettingsAsync(companyId);
            return this.Ok(settings);
        }

     

       
        [HttpPost]
        public async Task<IActionResult> UpdateCompanySettings(CompanySettingsModel input)
        {
             var companyId = this.User.Claims.FirstOrDefault(x => x.Type == "companyId").Value;

            await settingsService.UpdateComapnySettingsAsync(companyId, input);

            return this.Ok(new ResponseViewModel
            {
                Status = SuccessMessages.SuccessfullyStatus,
                Message = string.Format(SuccessMessages.UpdateCompanySettings)
            });



        }

     
     
    }
}
