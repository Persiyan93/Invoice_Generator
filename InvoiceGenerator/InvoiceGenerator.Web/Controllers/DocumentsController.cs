using InvoiceGenerator.Services.MicrosoftWordService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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
    public class DocumentsController : ControllerBase
    {
        private readonly IDocumentService documentService;

        public DocumentsController(IDocumentService documentService)
        {
            this.documentService = documentService;
        }

        [HttpGet("{invoiceId}")]

        public IActionResult GenerateInvoiceInPdfFromat(string invoiceId)
        {

            documentService.GenerateInvoice(invoiceId);
            return this.Ok();
        }

    }
}
