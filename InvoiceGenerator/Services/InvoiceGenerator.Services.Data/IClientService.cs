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

        Task<string> CreateClientAsync(ClientInputModel inputModel,string companyId);

        Task<ICollection<T>> GetAllClientsAsync<T>(string companyId,string orderBy , string order  , string filterString );

        Task<T> GetClientByIdAsync<T>(string clientId);

        Task EditClientInfoAsync(EditClientInputModel inputModel,string clientId);

        Task UpdateClientStatusAsync(ClientStatusUpdateModel input);

        Task<ICollection<TopClientsViewModel>> GetTopClientsForLastMonthAsync(string companyId);

      

        

        


    }
}
