using InvoiceGenerator.Common;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Services.Data;
using InvoiceGenerator.Services.MicrosoftWordService;
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
        private readonly IDocumentService documentService;

        public InvoicesController(IInvoiceService invoiceService, UserManager<ApplicationUser> userManager,IDocumentService documentService)
        {
            this.invoiceService = invoiceService;
            this.userManager = userManager;
            this.documentService = documentService;
        }



       

        [HttpGet("{invoiceId}")]
        public async Task<IActionResult> GetInvoiceDetails(string invoiceId)
        {
            var invoice = await invoiceService.GetInvoiceByIdAsync<InvoiceViewModel>(invoiceId);

            return this.Ok(invoice);

        }

        [HttpPost]
        public async Task<IActionResult> AddInvoice(InvoiceInputModel inputModel)
        {
            var user = await userManager.GetUserAsync(this.User);
            
            var invoiceId = await invoiceService.CreateInvoiceAsync(inputModel,user.CompanyId,user.Id);
            documentService.GenerateInvoiceAsync(invoiceId, user.CompanyId);
             

            return this.Ok(new ResponseViewModel
            {
                Status = SuccessMessages.SuccessfullyStatus,
                Message = string.Format(SuccessMessages.SuccessfullyCreatedInvoice, invoiceId)
            });

        }

        [HttpPost]
        [Route("Status")]
        public async Task<IActionResult> UpdateInvoiceStatus(UpdateInvoiceStatusInputModel inputModel)
        {
            var companyId = this.User.Claims.FirstOrDefault(x => x.Type == "companyId").Value;
            var user = await userManager.FindByNameAsync(this.User.Identity.Name);
            var userId = user.Id;

           await invoiceService.UpdateStatusOfInvoicesAsync(inputModel, companyId, userId);

            return this.Ok(new ResponseViewModel
            {
                Status = SuccessMessages.SuccessfullyStatus,
                Message = string.Format(SuccessMessages.SuccessfullyUpdateStatusOfInvoices)
            });

        }

        [HttpPut("{invoiceId}")]
        public async Task<IActionResult> EditInvoice(InvoiceInputModel inputModel,string invoiceId)
        {
            var companyId = this.User.Claims.FirstOrDefault(x => x.Type == "companyId").Value;
            var user = await userManager.FindByNameAsync(this.User.Identity.Name);
            var userId = user.Id;

            await invoiceService.EditInvoiceAsync(inputModel, userId, invoiceId);
            documentService.GenerateInvoiceAsync(invoiceId, user.CompanyId);

            return this.Ok(new ResponseViewModel
            {
                Status = SuccessMessages.SuccessfullyStatus,
                Message = string.Format(SuccessMessages.SuccessfullyEditInvoice, invoiceId)
            });

        }

        [HttpGet]

        public async Task<IActionResult> GetAll(DateTime startDate, DateTime endDate,
                    int rowsPerPage = 10, string filterString = "",
                    string orderBy = "IssueDate", string order = "asc", int page = 0)
        {
            var companyId = this.User.Claims.FirstOrDefault(x => x.Type == "companyId").Value;
            var invoices = await invoiceService.GetAllCompanyInvoicesAsync<InvoiceInListViewModel>(companyId, startDate, endDate,
             orderBy, order,  filterString);
            var invoicesCount = invoices.Count;
            invoices = invoices
                .Skip(rowsPerPage * (page ))
                .Take(rowsPerPage)
                .ToList();
          

            return this.Ok(new{FilteredInvoice=invoices,CountOfAllInvoices=invoicesCount });
        }



        [HttpGet]
        [Route("ClientInvoices/{clientId}")]
        public async Task<IActionResult> GetClientIncvoices(string clientId, DateTime startDate, DateTime endDate, int rowsPerPage = 10,
                    string orderBy = "IssueDate", string order = "asc", int page = 0)
        {
            var companyId = this.User.Claims.FirstOrDefault(x => x.Type == "companyId").Value;
            var invoices = await invoiceService.GetClientInvoicesByClientIdAsync<InvoiceInListViewModel>(clientId, startDate, endDate,
             orderBy, order) ;
            var invoicesCount = invoices.Count;
            invoices = invoices
                .Skip(rowsPerPage * (page))
                .Take(rowsPerPage)
                .ToList();


            return this.Ok(new { FilteredInvoice = invoices, CountOfAllInvoices = invoicesCount });
        }

    }
}
