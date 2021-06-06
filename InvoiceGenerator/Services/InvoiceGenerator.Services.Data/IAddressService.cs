using InvoiceGenerator.Web.Models.Address;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Services.Data
{
    public interface IAddressService
    {
        Task<int> AddCountry(string countryName);

        Task<int> AddTown(string townName,int countryName);

        Task AddFullAddress(AddressInputModel inputmodel);
    }
}
