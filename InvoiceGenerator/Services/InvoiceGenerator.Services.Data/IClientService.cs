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

        Task<string> CreateClientAsync(ClientInputModel inputModel);

        Task<ICollection<T>> GetAllClientsAsync<T>(string registeredCompanyId);

        Task<T> GetClientByIdAsync<T>(string clientId);

        Task EditClientInfoAsync(EditClientInputModel inputModel,string clientId);

      

        

        


    }
}
