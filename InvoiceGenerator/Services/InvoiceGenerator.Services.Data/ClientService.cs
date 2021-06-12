using InvoiceGenerator.Common;
using InvoiceGenerator.Data;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Services.Mapping;
using InvoiceGenerator.Web.Models.Address;
using InvoiceGenerator.Web.Models.Client;
using InvoiceGenerator.Web.Models.Company;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Services.Data
{
    public class ClientService:IClientService
    {
        private readonly ApplicationDbContext context;
        private readonly IAddressService addressService;

        public ClientService(ApplicationDbContext context,IAddressService addressService)
        {
            this.context = context;
            this.addressService = addressService;
        }

        public  async Task AddContactPersonAsync(string contactPersonId, string clientId)
        {
            var client = await  context.Clients
                     .FirstOrDefaultAsync(x => x.Id == clientId);
            var contactPerson = await context.ContactPeople.FirstOrDefaultAsync(x => x.Id == contactPersonId);
            if (client==null|| contactPerson==null)
            {
                throw new InvalidUserDataException(ErrorMessages.IncorectData);
            }
            client.Employees.Add(contactPerson);
            await context.SaveChangesAsync();
        }

        public async Task AddMailingAddressAsync(string clientId, AddressInputModel inputModel)
        {
            var client = await context.Clients
                .FirstOrDefaultAsync(x => x.Id == clientId);
            if (client==null)
            {
                throw new InvalidUserDataException(string.Format(ErrorMessages.CompanyWithSuchIdDoesNotExist, clientId));
            }
            var addressId = await addressService.AddFullAddress(inputModel);
            client.MailingAddressId = addressId;
            await context.SaveChangesAsync();
        }

        public async Task<string> CreateClientAsync(CompanyInputModel inputModel )
        {
            var client = await context.Clients
                    .FirstOrDefaultAsync(x => x.VatNumber == inputModel.VatNumber && x.IsActive == true);
            if (client!=null)
            {
                throw new InvalidUserDataException(string.Format(ErrorMessages.ClientAlreadyExist, inputModel.VatNumber));
            }
            client = new Client
            {
                Name = inputModel.Name,
                VatNumber=inputModel.VatNumber,
                CompanyType=inputModel.CompanyType,
                
            };
            var addressId = await addressService.AddFullAddress(inputModel.Address);
            client.AddressId = addressId;
            await context.Clients.AddAsync(client);
            await context.SaveChangesAsync();
            return client.Id;

        }

        public async Task<T> GetClientByIdAsync<T>(string clientId)
        {
            var client =await  context.Clients
                 .Where(x => x.Id == clientId &&x.IsActive==true)
                 .To<T>()
                 .FirstOrDefaultAsync();


            return client;
                
        }

        public async Task EditClientInfoAsync(EditClientInputModel inputModel,string clientId)
        {
            var client = await  context.Clients
                    .FirstOrDefaultAsync(x => x.Id ==clientId);
            if (client==null)
            {
                throw new InvalidUserDataException(string.Format(ErrorMessages.ClientDoesNotExist, clientId));
            }
           await context.Entry(client).Reference(x => x.Invoices).LoadAsync();
            if (client.Invoices.Count>0)
            {
                var newClient = new Client
                {
                    Name = inputModel.Name,
                    AccontablePersonName = inputModel.AccontablePersonName,
                    VatNumber = client.VatNumber,
                    AddressId = client.AddressId,
                    MailingAddressId = client.MailingAddressId,
                    UniqueIdentificationNumber = client.UniqueIdentificationNumber


                };
                client.IsActive = false;
               await context.Clients.AddAsync(newClient);

                
            }
            else
            {
                client.Name = inputModel.Name;
                client.AccontablePersonName = inputModel.AccontablePersonName;
                client.CompanyType = inputModel.CompanyType;
                
            }
            await context.SaveChangesAsync();
            
        }

       

       
    }
}
