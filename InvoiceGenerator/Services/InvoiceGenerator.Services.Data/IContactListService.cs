using InvoiceGenerator.Web.Models.ContactPerson;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InvoiceGenerator.Services.Data
{
   public  interface IContactListService
    {
        Task<string> AddContactPersonAsync(ContactPersonInputModel inputModel);

        Task<ICollection<T>> GetContactListAsync<T>(string clientId);

    }
}
