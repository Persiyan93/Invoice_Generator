﻿using InvoiceGenerator.Common;
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

       

      

        public async Task<string> CreateClientAsync(ClientInputModel inputModel,string companyId )
        {
            var client = await context.Clients
                    .FirstOrDefaultAsync(x => x.VatNumber == inputModel.VatNumber && x.IsActive == true);
            if (client!=null)
            {
                throw new InvalidUserDataException(string.Format(ErrorMessages.ClientAlreadyExist, inputModel.VatNumber));
            }
            var company = await context.RegisteredCompanies
                .FirstOrDefaultAsync(x => x.Id == companyId);
            if (company==null)
            {
                throw new InvalidUserDataException(string.Format(ErrorMessages.CompanyWithSuchIdDoesNotExist, companyId));
            }
            client = new Client
            {
                Name = inputModel.CompanyName,
                VatNumber = inputModel.VatNumber,
                CompanyType = inputModel.CompanyType,
                SellerId = companyId,
                UniqueIdentificationNumber = inputModel.UniqueIdentificationNumber ,
                AccontablePersonName=inputModel.AccontablePersonName??null
                

                
            };
            var addressId = await addressService.AddFullAddressAsync(inputModel.Address);
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
                    Name = inputModel.CompanyName,
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
                client.Name = inputModel.CompanyName;
                client.VatNumber = inputModel.VatNumber;
                client.AccontablePersonName = inputModel.AccontablePersonName;
                client.CompanyType = inputModel.CompanyType;
                client.UniqueIdentificationNumber = client.UniqueIdentificationNumber;
                
            }
            await context.SaveChangesAsync();
            
        }

        public async Task<ICollection<T>> GetAllClientsAsync<T>(string registeredCompanyId)
        {
            var clients = await context.Clients
                     .Where(x => x.SellerId == registeredCompanyId && x.IsActive==true)
                     .To<T>()
                     .ToListAsync();

            return clients;
        }
    }
}
