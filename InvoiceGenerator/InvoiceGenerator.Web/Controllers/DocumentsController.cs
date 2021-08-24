using InvoiceGenerator.Services.MicrosoftWordService;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
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
        
            var pdfAsStream = documentService.GetInvoiceAsPdf(invoiceId);
            Response.ContentType = "application/pdf";
            
            return new FileStreamResult(pdfAsStream, "application/pdf");
            
            

      

            //return new FileContentResult (pdfAsByteArray, "application/pdf");

        }
    }
}
