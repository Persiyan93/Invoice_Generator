using InvoiceGenerator.Common;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Services.Data;
using InvoiceGenerator.Web.Models.ContactPerson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Invoice_Generator.Services.Tests.Services
{
    public class ContactListServiceTest:BaseServiceTest
    {
        private const string personEmailAddress = "Test";
        private const string clientCompanyId = "Test";
        [Fact]
        public async Task TryAddContactPersonWhichAlreadyExistThrowException()
        {

            //Arrange

            var contactListService = new ContactListService(this.DbContext);
            await this.DbContext.ContactPeople.AddAsync(new ContactPerson { Email = personEmailAddress });
            await this.DbContext.SaveChangesAsync();
            var contactPerson = new ContactPersonInputModel { Email = personEmailAddress };
            //Action

            Func<Task> act = () => contactListService.AddContactPersonAsync(contactPerson);

            //Assert
            var exception = await Assert.ThrowsAsync<InvalidUserDataException>(act);
            var expectedError = string.Format(ErrorMessages.PersonWithSuchEmailAlreadyExist, personEmailAddress);
            Assert.Equal(expectedError, exception.Message);

        }
        [Fact]
        public async Task AddContactPersonShouldAddPersonToClient()
        {
            //Arrange
            var contactListService = new ContactListService(this.DbContext);
            var newClient = new Client();
            await this.DbContext.Clients.AddAsync(newClient);
            await this.DbContext.SaveChangesAsync();
            //Action

            var newContactPerson = new ContactPersonInputModel { Email = personEmailAddress, ClientId = newClient.Id };
            await contactListService.AddContactPersonAsync(newContactPerson);

            //Assert
            var expectedCountOfContactPeoples = 1;
            var countOfContactPeoples= this.DbContext.ContactPeople.Count();
            Assert.Equal(expectedCountOfContactPeoples, countOfContactPeoples);
        }

        [Fact]
        public async Task GetContactListShoulReturnContactList<T>()
        {
            //Arrange
            var contactListService = new ContactListService(this.DbContext);
            var contactPerson = new ContactPerson { ClientId = clientCompanyId };
            await this.DbContext.ContactPeople.AddAsync(contactPerson);
            await this.DbContext.SaveChangesAsync();
            //Action


            var contactList =await  contactListService.GetContactListAsync<ContactPersonViewModel>(clientCompanyId);


            //Assert
            var expectedCountOfContactList = 1;
            var contactListCount = contactList.Count();
            Assert.Equal(expectedCountOfContactList, contactListCount);
        }
    }
}
