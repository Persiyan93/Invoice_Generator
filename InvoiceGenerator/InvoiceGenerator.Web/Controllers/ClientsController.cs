using InvoiceGenerator.Common;
using InvoiceGenerator.Common.Resources;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Services.Data;
using InvoiceGenerator.Web.Models;
using InvoiceGenerator.Web.Models.Client;
using InvoiceGenerator.Web.Models.Company;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
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
    public class ClientsController : ControllerBase
    {
        private readonly IClientService clientService;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IMemoryCache cache;
        private readonly IStringLocalizer<Messages> stringLocalizer;

        public ClientsController(IClientService clientService, UserManager<ApplicationUser> userManager , IMemoryCache cache,IStringLocalizer<Messages> stringLocalizer)
        {
            this.clientService = clientService;
            this.userManager = userManager;
            this.cache = cache;
            this.stringLocalizer = stringLocalizer;
        }

      
        [HttpPost]
        public async Task<IActionResult> AddClient(ClientInputModel inputModel)
        {
          
            var companyId = this.User.Claims.FirstOrDefault(x => x.Type == "companyId").Value;
            var clientId = await clientService.CreateClientAsync(inputModel, companyId);

            return this.Ok(
                new ResponseViewModel
                {
                    Status = "Successful",
                    Message = string.Format(stringLocalizer["SuccessfullyAddedClient"])

                });

        }

      
        [HttpGet]
        public async Task<IActionResult> GetAllClients( string orderBy = "Name", string order = "asc",
                                                    int page = 0, int rowsPerPage = 10, string filterString = "")
        {
            var companyId = this.User.Claims.FirstOrDefault(x => x.Type == "companyId").Value;
            var clients = await clientService.GetAllClientsAsync<ClientInListViewModel>( companyId,
                                                   orderBy,  order , filterString );
            var clientsCount = clients.Count;
            clients=clients
                 .Skip(rowsPerPage * (page))
                .Take(rowsPerPage)
                .ToList();


            return this.Ok(new { FilteredClients =clients, CountOfClients = clientsCount });
           
        }

        
        [HttpPut]
        [Route("UpdateClientStatus")]
        public async Task<IActionResult> UpdateClientStatus(ClientStatusUpdateModel input)
        {
            var user = await userManager.FindByNameAsync(this.User.Identity.Name);
            var companyId = user.CompanyId;
            await clientService.UpdateClientStatusAsync(input);
            var response = new ResponseViewModel
            {
                Status = "Successful",
                Message = stringLocalizer["SuccessfullyUpdateStatusOfClient"]

            };
            return this.Ok(response);
        }



     
        [HttpGet("{clientId}")]
        public async Task<IActionResult> GetClientInfo(string clientId)
        {
            var client = await clientService.GetClientByIdAsync<ClientViewModel>(clientId);

            return this.Ok(client);

        }

       
        [HttpGet]
        [Route("additionalInfo/{clientId}")]
        public async Task<IActionResult> GetAdditionalClientInfo(string clientId)
        {
            var client = await clientService.GetClientByIdAsync<AdditionalClientInfo>(clientId);

            return this.Ok(client);

        }

        [HttpGet]
        [Route("TopClients")]
        public async Task<IActionResult> GetTopClients(string clientId)
        {
            var user = await  userManager.GetUserAsync(this.User);
            var cacheKey = "TopClients" + user.CompanyId;
            ICollection<TopClientsViewModel> clients;

            if (!this.cache.TryGetValue(cacheKey, out clients))
            {
                clients = await clientService.GetTopClientsForLastMonthAsync(user.CompanyId);
                this.cache.Set(cacheKey, clients, TimeSpan.FromHours(24));
            }

          

            return this.Ok(clients);

        }





    }

}
