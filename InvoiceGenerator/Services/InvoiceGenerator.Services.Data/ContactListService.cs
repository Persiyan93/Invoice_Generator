using InvoiceGenerator.Common;
using InvoiceGenerator.Data;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Services.Mapping;
using InvoiceGenerator.Web.Models.ContactPerson;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Services.Data
{
    public class ContactListService : IContactListService
    {
        private readonly ApplicationDbContext context;

        public ContactListService(ApplicationDbContext context)
        {
            this.context = context;
        }
        public async Task<string> AddContactPerson(ContactPersonInputModel inputModel)
        {
            var contactactPerson = await context.ContactPeople
                .FirstOrDefaultAsync(x => x.PhoneNumber == inputModel.PhoneNumber ||
                                           x.Email == inputModel.Email);
            if (contactactPerson != null)
            {
                throw new InvalidUserDataException(ErrorMessages.IncorectData);
            }
            var client = context.Clients
                .FirstOrDefaultAsync(x => x.Id == inputModel.ClientId);
            if (client==null)
            {
                throw new InvalidUserDataException(string.Format(ErrorMessages.ClientDoesNotExist, inputModel.ClientId));
            }
            
            contactactPerson = new ContactPerson
            {
                Name = inputModel.Name,
                Email = inputModel.Email,
                PhoneNumber = inputModel.PhoneNumber,
                ClientId=inputModel.ClientId 
                

            };
            
            await context.ContactPeople.AddAsync(contactactPerson);
            await context.SaveChangesAsync();
            return contactactPerson.Id;

        }

        public async Task<ICollection<T>> GetContactList<T>(string clientId)
        {
            var contactList = await context.ContactPeople
                    .Where(x => x.ClientId == clientId)
                    .To<T>()
                    .ToListAsync();

            return contactList;
                
        }
    }
}
