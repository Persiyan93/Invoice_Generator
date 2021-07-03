using InvoiceGenerator.Common;
using InvoiceGenerator.Data;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Services.Mapping;
using InvoiceGenerator.Web.Models.Address;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Services.Data
{
   public  class AddressService:IAddressService
    {
        private readonly ApplicationDbContext context;

        public AddressService(ApplicationDbContext context)
        {
            this.context = context;
        }

       

        public async  Task<string> AddFullAddressAsync(IAddress inputmodel)
        {
            var countryId =  await AddCountry(inputmodel.CountryName);
            var townId = await AddTown(inputmodel.TownName, countryId);
            var address = new Address
            {
                TownId = townId,
                AddressText = inputmodel.AddressText

            };
            await context.Addresses.AddAsync(address);
            await context.SaveChangesAsync();
            return address.Id;

            
        }

        public async  Task<string> AddMailingAddressAsync(MailingAddressInputModel inputModel)
        {
            var client = await context.Clients
                .FirstOrDefaultAsync(x => x.Id == inputModel.ClientId);
            if (client==null)
            {
                throw new InvalidUserDataException(string.Format(ErrorMessages.ClientDoesNotExist, inputModel.ClientId));
            }

            var mailingAddressId = await AddFullAddressAsync(inputModel);
            client.MailingAddressId = mailingAddressId;
            await context.SaveChangesAsync();
            return mailingAddressId;

        }

   

        public Task EditAddress(AddressInputModel inputModel)
        {
            throw new NotImplementedException();
        }

        public async Task<T> GetAddressInfoAsync<T>(string addressId)
        {
            var addressInfo =  await context.Addresses
                .Where(x => x.Id == addressId)
                .To<T>()
                .FirstOrDefaultAsync();

            return addressInfo;
        }

        private async Task<int> AddCountry(string countryName)
        {
            var country = await context.Countries.FirstOrDefaultAsync(x => x.Name.ToUpper() == countryName.ToUpper());
            if (country != null)
            {
                return country.Id;
            }
            country = new Country { Name = countryName };
            await context.Countries.AddAsync(country);
            await context.SaveChangesAsync();
            return country.Id;
        }

        private async Task<int> AddTown(string townName, int countryid)
        {
            var town = await context.Towns.FirstOrDefaultAsync(x => x.Name.ToUpper() == townName.ToUpper());
            if (town != null)
            {
                return town.Id;
            }
            town = new Town
            {
                Name = townName,
                CountryId = countryid
            };
            await context.Towns.AddAsync(town);
            await context.SaveChangesAsync();
            return town.Id;
        }

    }
}
