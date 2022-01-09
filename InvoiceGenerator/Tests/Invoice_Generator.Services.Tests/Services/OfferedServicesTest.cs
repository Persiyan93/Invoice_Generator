using InvoiceGenerator.Common;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Data.Models.Enum;
using InvoiceGenerator.Services.Data;
using InvoiceGenerator.Web.Models.OfferedService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Invoice_Generator.Services.Tests.Services
{
    public class OfferedServicesTest:BaseServiceTest
    {

        private const string registeredCompanyId = "Test";

        //[Fact]
        //public async Task AddServiceAsyncShouldAddServiceInDb()
        //{

        //    //Arrange
        //    var offeredService = new OfferedServices(this.DbContext);
        //    var inputService = new ServiceInputModel();



        //    //Action
        //    //Func<Task> act = () => articleService.AddArticle(new ArticleInputModel(), "test", "test");

        //    var serviceId=await offeredService.AddServiceAsync(inputService, registeredCompanyId);

        //    //Assert
        //    var expectedCountOfServicesInDb = 1;
        //    var countOfServicesInDb = this.DbContext.Services.Count();
        //    Assert.Equal(expectedCountOfServicesInDb, countOfServicesInDb);
        //    Assert.NotNull(serviceId);

        //}


        //[Fact]
        //public async Task GetAllServicesAsyncShouldReturnOneService()
        //{

        //    //Arrange
        //    var offeredService = new OfferedServices(this.DbContext);
        //    var inputService = new ServiceInputModel();
        //    var serviceOne = new Service { CompanyId = registeredCompanyId };
        //    await this.DbContext.AddAsync(serviceOne);
        //    var serviceTwo = new Service { CompanyId = "Random" };
        //    await this.DbContext.AddAsync(serviceTwo);
        //    await this.DbContext.SaveChangesAsync();


        //    //Action
        //    var services = await offeredService.GetAllServicesAsync<ServiceViewModel>(registeredCompanyId);

        //    //Assert
        //    var expectedCountOfServices = 1;
           
        //    Assert.Equal(expectedCountOfServices,services.Count);
          

        //}

        //[Fact]
        //public async Task UpdateStatusOfServiceAsyncShouldChangeStatusOfService()
        //{

        //    //Arrange
        //    var offeredService = new OfferedServices(this.DbContext);
        //    var serviceOne = new Service { CompanyId = registeredCompanyId,  Status= ProductStatus.Active};
        //    await this.DbContext.AddAsync(serviceOne);
        //    await this.DbContext.SaveChangesAsync();
        //    var inputService = new ServiceUpdateModel { Status = ProductStatus.Blocked };


        //    //Action
        //   await offeredService.UpdateStatusOfServiceAsync(inputService, serviceOne.Id, registeredCompanyId);

        //    //Assert
        //    var serviceFromDb = this.DbContext.Services.FirstOrDefault();
        //    Assert.Equal(ProductStatus.Blocked, serviceFromDb.Status);


        //}

        //[Fact]
        //public async Task TryUpdateStatusOfServiceWhichDoesNotExist()
        //{

        //    //Arrange
        //    var offeredService = new OfferedServices(this.DbContext);
        //    var inputService = new ServiceUpdateModel { Status = ProductStatus.Blocked };


        //    //Action
        //    Func<Task> act = () => offeredService.UpdateStatusOfServiceAsync(inputService, "test", registeredCompanyId);

        //    //Assert
        //    var exception = await Assert.ThrowsAsync<InvalidUserDataException>(act);
        //    var expectedError = string.Format(ErrorMessages.InvalidServiceId, "test");
        //    Assert.Equal(expectedError, exception.Message);


        //}

    }
}
