using InvoiceGenerator.Web.Models.Address;
using InvoiceGenerator.Web.Models.Client;
using InvoiceGenerator.Web.Models.Company;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Services.Data
{
    public interface IClientService
    {

        Task<string> CreateClientAsync(CompanyInputModel inputModel);

        Task AddMailingAddressAsync(string clientId, AddressInputModel inputModel);

        Task<T> GetClientByIdAsync<T>(string clientId);

        Task EditClientInfoAsync(EditClientInputModel inputModel,string clientId);

        Task AddContactPersonAsync(string contactPersonId, string clientId);

        

        


    }
}
