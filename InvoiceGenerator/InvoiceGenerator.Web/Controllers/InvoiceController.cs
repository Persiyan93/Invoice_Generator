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
    public class InvoiceController : ControllerBase


    {
        private readonly IInvoiceService invoiceService;
        private readonly UserManager<ApplicationUser> userManager;

        public InvoiceController(IInvoiceService invoiceService,UserManager<ApplicationUser> userManager)
        {
            this.invoiceService = invoiceService;
            this.userManager = userManager;
        }

        [HttpPost]
        public async Task<IActionResult> CreateInvoice(InvoiceInputModel inputModel)
        {
            
            var userId =  userManager.GetUserId(User);
            var invoiceId=await invoiceService.CreateInvoice(inputModel,userId);

            return this.Ok(new ResponseViewModel
            {
                Status = SuccessMessages.SuccessfullyStatus,
                Message = string.Format(SuccessMessages.SuccessfullyCreatedInvoice, invoiceId)
            });

            
            
        }


        [HttpGet("{invoiceId}")]
        public async Task<IActionResult> GetInvoiceById(string invoiceId) 
        {
            var invoice = await invoiceService.GetInvoiceById<InvoiceViewModel>(invoiceId);

            return this.Ok(invoice);

        }

        [HttpGet]

        public async Task<IActionResult> GetAll()
        {
            var userid = userManager.GetUserId(this.User);
            var invoices = await invoiceService.GetAllCompanyInvoices<InvoiceInLIstVIewModel>(userid);

            return this.Ok(invoices);
        }
 
    }
}
