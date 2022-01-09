using InvoiceGenerator.Common;
using InvoiceGenerator.Services.Data;
using InvoiceGenerator.Web.Models;
using InvoiceGenerator.Web.Models.Address;
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
    public class MailingAddressController : ControllerBase
    {
        private readonly IAddressService addressService;

        public MailingAddressController(IAddressService addressService)
        {
            this.addressService = addressService;
        }

        [HttpPost]
        public async Task<IActionResult> AddMailingAddress(MailingAddressInputModel inputModel)
        {
            await addressService.AddMailingAddressAsync(inputModel);
            return this.Ok(
                new ResponseViewModel
                {
                    Status = "Successful",
                    Message = SuccessMessages.SuccessfullyAddedMailingAddress
                });
        }



        [HttpGet("{mailingAddressId}")]
        public async Task<IActionResult> GetMailingAddress(string mailingAddressId)
        {
            var mailingAddress = await addressService.GetAddressInfoAsync<AddressViewModel>(mailingAddressId);

            return this.Ok(mailingAddress);
        }
    }
}
