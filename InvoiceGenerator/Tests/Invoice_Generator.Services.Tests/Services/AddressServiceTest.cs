using InvoiceGenerator.Common;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Services.Data;
using InvoiceGenerator.Web.Models.Address;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Invoice_Generator.Services.Tests.Services
{
    public class AddressServiceTest:BaseServiceTest
    {
        private const string registeredCompanyId = "Test";

        [Fact]
        public async Task TryAddMailingAddressToNotExistingClient()
        {

            //Arrange

            var addressService = new AddressService(this.DbContext);
            var newMailingAddress = new MailingAddressInputModel { ClientId = "test" };


            //Action
            Func<Task> act = () => addressService.AddMailingAddressAsync(newMailingAddress);

            //Assert
            var exception = await Assert.ThrowsAsync<InvalidUserDataException>(act);
            var expectedError = string.Format(ErrorMessages.ClientDoesNotExist, "test");
            Assert.Equal(expectedError, exception.Message);

        }

        [Fact]
        public async Task AddMailngAddressShouldAddAdressToClient()
        {

            //Arrange

            var addressService = new AddressService(this.DbContext);
            var newClient = new Client();
            await this.DbContext.Clients.AddAsync(newClient);
             await this.DbContext.SaveChangesAsync();
            var newMailingAddress = new MailingAddressInputModel { ClientId = newClient.Id,Town="Test",Country="Test",AddressText="Test" };


            //Action
           await addressService.AddMailingAddressAsync(newMailingAddress);

            //Assert
           var mailingAddress= this.DbContext.Addresses.FirstOrDefault();
            Assert.NotNull(mailingAddress);
            var expectedCountOfMailingAddress = 1;
            var countOfMailingAddresses = this.DbContext.Addresses.Count();
            Assert.Equal(expectedCountOfMailingAddress, countOfMailingAddresses);

        }
       
      
    
    }
}
