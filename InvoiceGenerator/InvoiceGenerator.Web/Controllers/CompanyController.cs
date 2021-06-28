using InvoiceGenerator.Common;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Services.Data;
using InvoiceGenerator.Web.Models;
using InvoiceGenerator.Web.Models.Company;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly ICompanyService companyService;
        private readonly UserManager<ApplicationUser> userManager;

        public CompanyController(ICompanyService companyService, UserManager<ApplicationUser> userManager)
        {
            this.companyService = companyService;
            this.userManager = userManager;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateCompany(CompanyInputModel inputModel)
        {
            var userName = this.User.Identity.Name;

            var user = await userManager.FindByNameAsync(userName);
            var companyId = await companyService.CreateAsync(inputModel, user.Id);
            await userManager.AddToRoleAsync(user, "AdministratorOfCompany");
            return this.Ok(new ResponseViewModel
            {
                Status = "Successful",
                Message = string.Format(SuccessMessages.SuccessfullyCreatedCompany, companyId)
            });
        }
    }
}
