using InvoiceGenerator.Common;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Services.Data;
using InvoiceGenerator.Web.Models;
using InvoiceGenerator.Web.Models.Invoices;
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
    [Authorize]
    public class InvoicesController : ControllerBase


    {
        private readonly IInvoiceService invoiceService;
        private readonly UserManager<ApplicationUser> userManager;

        public InvoicesController(IInvoiceService invoiceService, UserManager<ApplicationUser> userManager)
        {
            this.invoiceService = invoiceService;
            this.userManager = userManager;
        }



       

        [HttpGet("{invoiceId}")]
        public async Task<IActionResult> GenerateInvoiceInPdf(string invoiceId)
        {
            var invoice = await invoiceService.GetInvoiceById<InvoiceViewModel>(invoiceId);

            return this.Ok(invoice);

        }
        [HttpPost]
        public async Task<IActionResult> SaveInvoice(InvoiceInputModel inputModel)
        {
            var companyId = this.User.Claims.FirstOrDefault(x => x.Type == "companyId").Value;
            var user = await userManager.FindByNameAsync(this.User.Identity.Name);
            var userId = user.Id;

            var invoiceId = await invoiceService.AddInvoice(inputModel,companyId,userId);

            return this.Ok(new ResponseViewModel
            {
                Status = SuccessMessages.SuccessfullyStatus,
                Message = string.Format(SuccessMessages.SuccessfullyCreatedInvoice, invoiceId)
            });

        }


        //[HttpGet("{invoiceId}")]
        //public async Task<IActionResult> GetInvoiceById(string invoiceId)
        //{
        //    var invoice = await invoiceService.GetInvoiceById<InvoiceViewModel>(invoiceId);

        //    return this.Ok(invoice);

        //}

        [HttpGet]

        public async Task<IActionResult> GetAll()
        {
            var companyId = this.User.Claims.FirstOrDefault(x => x.Type == "companyId").Value;
            var invoices = await invoiceService.GetAllCompanyInvoices<InvoiceInListViewModel>(companyId);

            return this.Ok(invoices);
        }

    }
}
