using InvoiceGenerator.Data;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Web.Models.Company;
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

        public async Task AddClient(CompanyInputModel clientCompany )
        {
            var client = new Client
            {
                Name = clientCompany.Name,
                VatNumber=clientCompany.VatNumber,
                CompanyType=clientCompany.CompanyType,

                
            };
            var addressId = await addressService.AddFullAddress(clientCompany.Address);
            client.AddressId = addressId;

        }
    }
}
