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
    [Authorize]
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
            var companyId = this.User.Claims.FirstOrDefault(x => x.Type == "companyId").Value;

            var serviceId = await offeredService.AddServiceAsync(inputModel, companyId);

            return this.Ok(
                new ResponseViewModel
                {
                    Status = "Successful",
                    Message = string.Format(SuccessMessages.SuccessfullyAddedService, serviceId)
                });
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var companyId = this.User.Claims.FirstOrDefault(x => x.Type == "companyId").Value;

            var services = await offeredService.GetAllServicesAsync<ServiceViewModel>(companyId);


            return this.Ok(services);

        }

        [HttpPut("{serviceId}")]
        public async Task<IActionResult> UpdateServiceStatus(ServiceUpdateModel input,string serviceId)
        {
            
            var companyId = this.User.Claims.FirstOrDefault(x => x.Type == "companyId").Value;

             await offeredService.UpdateStatusOfServiceAsync(input, serviceId, companyId);

            return this.Ok(
                new ResponseViewModel
                {
                    Status = "Successful",
                    Message = string.Format(SuccessMessages.SuccessfullyUpdateServiceStatus, serviceId)
                });
        }
    }
}
