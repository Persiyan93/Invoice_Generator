using InvoiceGenerator.Common;
using InvoiceGenerator.Common.Resources;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Services.Data;
using InvoiceGenerator.Web.Models;
using InvoiceGenerator.Web.Models.OfferedService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
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

        private readonly IStringLocalizer<Messages> stringLocalizer;

        public ServicesController(IOfferedService offeredService, IStringLocalizer<Messages> stringLocalizer)
        {
            this.offeredService = offeredService;
            this.stringLocalizer = stringLocalizer;
        }


        [HttpPost]
        public async Task<IActionResult> AddService(ServiceInputModel inputModel)
        {

            var companyId = this.User.Claims.FirstOrDefault(x => x.Type == "companyId").Value;
            var serviceName = await offeredService.AddServiceAsync(inputModel, companyId);

            return this.Ok(
                new ResponseViewModel
                {
                    Status = "Successful",
                    Message = stringLocalizer["SuccessfullyAddedService", serviceName]
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
        public async Task<IActionResult> UpdateServiceStatus(ServiceUpdateModel input, string serviceId)
        {

            var companyId = this.User.Claims.FirstOrDefault(x => x.Type == "companyId").Value;
            var serviceName = await offeredService.UpdateStatusOfServiceAsync(input, serviceId, companyId);

            return this.Ok(
                new ResponseViewModel
                {
                    Status = "Successful",
                    Message = stringLocalizer["SuccessfullyUpdatedService", serviceName]
                }); ;
        }
    }
}
