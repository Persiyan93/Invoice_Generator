using InvoiceGenerator.Common;
using InvoiceGenerator.Services.Data;
using InvoiceGenerator.Web.Models;
using InvoiceGenerator.Web.Models.ContactPerson;
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
    public class ContactListController : ControllerBase
    {
        private readonly IContactListService contactListService;

        public ContactListController(IContactListService contactListService)
        {
            this.contactListService = contactListService;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddContactPerson(ContactPersonInputModel inputModel)
        {
            var contactPersonId = await contactListService.AddContactPersonAsync(inputModel);
            return this.Ok(
                new ResponseViewModel
                {
                    Status = "Successful",
                    Message = string.Format(SuccessMessages.SuccessfullyAddedContactPerson, contactPersonId)

                });
        }
        [HttpGet("{clientId}")]
        [Authorize]
        public async Task<IActionResult> GetContactList(string clientId)
        {
            var contactList = await contactListService.GetContactListAsync<ContactPersonViewModel>(clientId);
            return this.Ok(contactList);
        }
    }
}
