using InvoiceGenerator.Common;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Services.Data;
using InvoiceGenerator.Web.Models;
using InvoiceGenerator.Web.Models.Client;
using InvoiceGenerator.Web.Models.Company;
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
    public class ClientsController : ControllerBase
    {
        private readonly IClientService clientService;
        private readonly UserManager<ApplicationUser> userManager;

        public ClientsController(IClientService clientService, UserManager<ApplicationUser> userManager)
        {
            this.clientService = clientService;
            this.userManager = userManager;
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> AddClient(ClientInputModel inputModel)
        {
            var user = await userManager.FindByNameAsync(this.User.Identity.Name);
            var companyId = user.CompanyId;
            var clientId = await clientService.CreateClientAsync(inputModel, companyId);

            return this.Ok(
                new ResponseViewModel
                {
                    Status = "Successful",
                    Message = string.Format(SuccessMessages.SuccessfullyCreatedClient, clientId)

                });

        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAllClients()
        {
            var user = await userManager.FindByNameAsync(this.User.Identity.Name);
            var companyId = user.CompanyId;
            var clients = await clientService.GetAllClientsAsync<ClientInListViewModel>(companyId);
            return this.Ok(clients);
        }



        [Authorize]
        [HttpGet("{clientId}")]
        public async Task<IActionResult> GetClientInfo(string clientId)
        {
            var client = await clientService.GetClientByIdAsync<ClientViewModel>(clientId);

            return this.Ok(client);

        }

        [Authorize]
        [HttpGet]
        [Route("additionalInfo/{clientId}")]
        public async Task<IActionResult> GetAdditionalClientInfo(string clientId)
        {
            var client = await clientService.GetClientByIdAsync<AdditionalClientInfo>(clientId);

            return this.Ok(client);

        }





    }

}
