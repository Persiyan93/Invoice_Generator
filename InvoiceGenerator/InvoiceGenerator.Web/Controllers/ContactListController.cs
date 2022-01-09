using InvoiceGenerator.Common;
using InvoiceGenerator.Common.Resources;
using InvoiceGenerator.Services.Data;
using InvoiceGenerator.Web.Models;
using InvoiceGenerator.Web.Models.ContactPerson;
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
    [Authorize]
    public class ContactListController : ControllerBase
    {
        private readonly IContactListService contactListService;
        private readonly IStringLocalizer<Messages> stringLocalizer;

        public ContactListController(IContactListService contactListService,IStringLocalizer<Messages> stringLocalizer)
        {
            this.contactListService = contactListService;
            this.stringLocalizer = stringLocalizer;
        }

        [HttpPost]
        public async Task<IActionResult> AddContactPerson(ContactPersonInputModel inputModel)
        {
            var contactPersonId = await contactListService.AddContactPersonAsync(inputModel);
            return this.Ok(
                new ResponseViewModel
                {
                    Status = "Successful",
                    Message = stringLocalizer["SuccessfullyAddedContactPerson",inputModel.Name]

                });
        }
        [HttpGet("{clientId}")]
        public async Task<IActionResult> GetContactList(string clientId)
        {
            var contactList = await contactListService.GetContactListAsync<ContactPersonViewModel>(clientId);
            return this.Ok(contactList);
        }
    }
}
