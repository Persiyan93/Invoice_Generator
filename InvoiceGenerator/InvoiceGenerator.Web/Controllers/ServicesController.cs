using InvoiceGenerator.Common;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Services.Data;
using InvoiceGenerator.Web.Models;
using InvoiceGenerator.Web.Models.OfferedService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ServicesController : ControllerBase
    {
        private readonly IOfferedService offeredService;
        private readonly UserManager<ApplicationUser> userManager;

        public ServicesController(IOfferedService offeredService, UserManager<ApplicationUser> userManager)
        {
            this.offeredService = offeredService;
            this.userManager = userManager;
        }


        [HttpPost]
        public async Task<IActionResult> AddService(ServiceInputModel inputModel)
        {
            var user = await userManager.FindByNameAsync(this.User.Identity.Name);
            var companyId = user.CompanyId;
            if (companyId == null)
            {
                return this.BadRequest();
            }
            var serviceId = await offeredService.AddService(inputModel, companyId);

            return this.Ok(
                new ResponseViewModel
                {
                    Status = "Successful",
                    Message = string.Format(SuccessMessages.SuccessfullyAddedService, serviceId)
                });
        }

        [HttpGet]
        public IActionResult Test()
        {
            //var user = await userManager.FindByNameAsync(this.User.Identity.Name);
            //var companyId = user.CompanyId;
            //if (companyId == null)
            //{
            //    return this.BadRequest();
            //}
            //var serviceId = await offeredService.AddService(inputModel, companyId);

            return this.Ok(
                new ResponseViewModel
                {
                    Status = "Successful",
                    //Message = string.Format(SuccessMessages.SuccessfullyAddedService, serviceId)
                });
        }
    }
}
