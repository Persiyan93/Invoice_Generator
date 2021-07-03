using InvoiceGenerator.Web.Models.ContactPerson;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InvoiceGenerator.Services.Data
{
   public  interface IContactListService
    {
        Task<string> AddContactPerson(ContactPersonInputModel inputModel);

        Task<ICollection<T>> GetContactList<T>(string clientId);

    }
}
