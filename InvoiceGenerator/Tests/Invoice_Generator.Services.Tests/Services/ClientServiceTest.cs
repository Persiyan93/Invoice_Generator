using InvoiceGenerator.Common;
using InvoiceGenerator.Data;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Data.Models.Enum;
using InvoiceGenerator.Services.Data;
using InvoiceGenerator.Web.Models.Address;
using InvoiceGenerator.Web.Models.Client;
using Microsoft.EntityFrameworkCore;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Invoice_Generator.Services.Tests.Services
{
    public class ClientServiceTest : BaseServiceTest
    {
        private const string RegisteredCompanyId = "Test";
        private const string addrressId = "Test";
        private const string clientName = "ClientName";



        //[Fact]
        //public async Task TryToAddClientWithVatNumberWhichAllreadExistThrowException()
        //{

        //    //Arrange
        //    var addressService = new Mock<IAddressService>();

        //    var clientService = new ClientService(this.DbContext, addressService.Object);
        //    var client = new Client
        //    {
        //        VatNumber = "2",
        //        IsActive = true

        //    };
        //    var newClient = new ClientInputModel { VatNumber = "2" };
        //    this.DbContext.Clients.Add(client);
        //    await this.DbContext.SaveChangesAsync();

        //    //Avtion
        //    Func<Task> act = () => clientService.CreateClientAsync(newClient, "");

        //    //Assert
        //    var exception = await Assert.ThrowsAsync<InvalidUserDataException>(act);

        //}

        //[Fact]
        //public async Task TryAddClientToNotExistingCompany()
        //{

        //    //Arrange
        //    var addressService = new Mock<IAddressService>();

        //    var clientService = new ClientService(this.DbContext, addressService.Object);

        //    var newClient = new ClientInputModel { VatNumber = "2" };


        //    //Action
        //    Func<Task> act = () => clientService.CreateClientAsync(newClient, "test");

        //    //Assert
        //    var exception = await Assert.ThrowsAsync<InvalidUserDataException>(act);
        //    var expectedError = string.Format(ErrorMessages.CompanyWithSuchIdDoesNotExist, "test");
        //    Assert.Equal(expectedError, exception.Message);

        //}

        //[Fact]
        //public async Task SuccessfullAddedClientShouldReturnClientId()
        //{
        //    var fakeAddressId = "fake";
        //    var expectedCountOfClients = 1;

        //    //Arrange
        //    var addressService = new Mock<IAddressService>();

        //    addressService.Setup(x => x.AddFullAddressAsync(It.IsAny<AddressInputModel>()))
        //      .ReturnsAsync(() => fakeAddressId);

        //    var clientService = new ClientService(this.DbContext, addressService.Object);
        //    var newClient = new ClientInputModel { VatNumber = "2" };

        //    await this.DbContext.RegisteredCompanies.AddAsync(new RegisteredCompany { Id = "test" });
        //    await this.DbContext.SaveChangesAsync();
        //    //Action
            
        //    await clientService.CreateClientAsync(newClient, "test");

        //    //Assert
        //    var countOfClients = this.DbContext.Clients.Count();
        //    Assert.Equal(expectedCountOfClients, countOfClients);

        //}

        //[Fact]
        //public async Task TryGetClientWhoseDoesntExistThrowException()
        //{

        //    var clietnId = "test";

        //    //Arrange
        //    var addressService = new Mock<IAddressService>();
        //    var clientService = new ClientService(this.DbContext, addressService.Object);

        //    //Action
        //    Func<Task> act = () => clientService.GetClientByIdAsync<ClientViewModel>(clietnId);

        //    //Assert
        //    var exception = await Assert.ThrowsAsync<InvalidUserDataException>(act);
        //    var expectedError = string.Format(ErrorMessages.ClientDoesNotExist);
        //    Assert.Equal(expectedError, exception.Message);

        //}
        //[Fact]
        //public async Task GetClientByClientIdSuccessfully()
        //{


        //    //Arrange
        //    await AddRegisteredCompanyToDb();
        //    var addressService = new Mock<IAddressService>();
        //    addressService.Setup(x => x.AddFullAddressAsync(It.IsAny<AddressInputModel>()))
        //      .ReturnsAsync(() => addrressId);

        //    var clientService = new ClientService(this.DbContext, addressService.Object);
        //    var newClient = new Client();
        //    var clientId = newClient.Id;

        //    await this.DbContext.Clients.AddAsync(newClient);

        //    await this.DbContext.SaveChangesAsync();

        //    //Action
        //    var result = await clientService.GetClientByIdAsync<ClientViewModel>(clientId);

        //    //Assert
        //    Assert.NotNull(result);



        //}




        //[Fact]
        //public async Task GetAllClietnsOfRegisteredCompanyShouldReturnOneClient()
        //{
        //    var expectedResult = 1;

        //    //Arrange
        //    var order = "desc";
        //    var orderBy = "Name";
        //    var filterString = "";
      
        //    await AddRegisteredCompanyToDb();
        //    await AddClientsToDb();

        //    var addressService = new Mock<IAddressService>();
        //    addressService.Setup(x => x.AddFullAddressAsync(It.IsAny<AddressInputModel>()))
        //      .ReturnsAsync(() => addrressId);

        //     var clientService = new ClientService(this.DbContext, addressService.Object);

        //    //Action
        //    var result = await clientService
        //        .GetAllClientsAsync<ClientInListViewModel>(RegisteredCompanyId,orderBy,order,filterString);

        //    //Assert
        //  //  Assert.NotNull(result);
        //    Assert.Equal(expectedResult, result.Count);
        //}
        [Fact]
        //public async Task UpdateClientStatusShouldUpdateProperlyClientStatus()
        //{
        //    //Arrange
        //    var addressService = new Mock<IAddressService>();
        //    addressService.Setup(x => x.AddFullAddressAsync(It.IsAny<AddressInputModel>()))
        //      .ReturnsAsync(() => addrressId);

        //    var clientService = new ClientService(this.DbContext, addressService.Object);
        //    var newclient = new Client { Status = ClientStatus.Active };
        //     await this.DbContext.Clients.AddAsync(newclient);
        //    await this.DbContext.SaveChangesAsync();
           

        //    //Action
        //    await clientService
        //        .UpdateClientStatusAsync(new ClientStatusUpdateModel { ClientId = newclient.Id, Status = ClientStatus.Blocked });
        //    var userFromDb = await this.DbContext.Clients.FirstOrDefaultAsync();

        //    //Assert
        //    Assert.NotNull(userFromDb);
        //    Assert.Equal(ClientStatus.Blocked, userFromDb.Status);



        //}



        private async Task AddRegisteredCompanyToDb()
        {
            await this.DbContext.RegisteredCompanies
                .AddAsync(new RegisteredCompany { Id = RegisteredCompanyId });
            await this.DbContext.SaveChangesAsync();
        }
        private async Task AddClientsToDb()
        {
            var client = new Client { SellerId = RegisteredCompanyId, Name = clientName ,IsActive=true };
            var client2 = new Client { SellerId = "Random" };
            await this.DbContext.Clients.AddAsync(client);
            await this.DbContext.Clients.AddAsync(client2);
            await this.DbContext.SaveChangesAsync();
        }
    }
}
