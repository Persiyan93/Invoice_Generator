using InvoiceGenerator.Data;
using InvoiceGenerator.Data.Models;
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

        public async  Task<int> AddCountry(string countryName)
        {
            var country = await context.Countries.FirstOrDefaultAsync(x => x.Name.ToUpper() == countryName.ToUpper());
            if (country!=null)
            {
                return country.Id;
            }
            country = new Country { Name = countryName };
            await context.Countries.AddAsync(country);
            await context.SaveChangesAsync();
            return country.Id;
        }

        public async  Task<string> AddFullAddress(AddressInputModel inputmodel)
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

        public  async Task<int> AddTown(string townName,int countryid)
        {
            var town = await context.Towns.FirstOrDefaultAsync(x => x.Name.ToUpper() == townName.ToUpper());
            if (town!=null)
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

        public Task EditAddress(AddressInputModel inputModel)
        {
            throw new NotImplementedException();
        }

        public Task<T> GetAddressInfo<T>(string addressId)
        {
            throw new NotImplementedException();
        }
    }
}
