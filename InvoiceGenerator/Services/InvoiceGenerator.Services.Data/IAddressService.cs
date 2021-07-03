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
      

        Task<string> AddFullAddressAsync(IAddress inputmodel);

        Task<string> AddMailingAddressAsync(MailingAddressInputModel inputModel);

        Task EditAddress(AddressInputModel inputModel);

        Task<T> GetAddressInfoAsync<T>(string addressId);
    }
}
