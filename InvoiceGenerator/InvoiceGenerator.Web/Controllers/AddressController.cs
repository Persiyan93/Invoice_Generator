using InvoiceGenerator.Common;
using InvoiceGenerator.Common.Resources;
using InvoiceGenerator.Services.Data;
using InvoiceGenerator.Web.Models;
using InvoiceGenerator.Web.Models.Address;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressController : ControllerBase
    {
        private readonly IAddressService addressService;
       

        public AddressController(IAddressService addressService)
        {
            this.addressService = addressService;
          
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddAddresss(AddressInputModel inputModel)
        {
            var adressId = await addressService.AddFullAddressAsync(inputModel);
            return this.Ok(
                new ResponseViewModel
                {
                    Status ="Successful",
                    Message=string.Format(SuccessMessages.SuccessfullyAddedAddress,adressId)
                    
                 });
        }
      
        
       
    }
}
