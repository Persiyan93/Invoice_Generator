using InvoiceGenerator.Common;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Services.Data;
using InvoiceGenerator.Web.Models.Address;
using InvoiceGenerator.Web.Models.Company;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Invoice_Generator.Services.Tests.Services
{
   public  class CompanyServiceTest:BaseServiceTest
    {
        private const string fakeAddressId = "Test";
        [Fact]
        public async Task CreateAsyncShouldAddRegisteredCompanyToDatabaseAndAddDefaultInvoiceOptions()
        {

            //Arrange
            var addressService = new Mock<IAddressService>();
            addressService.Setup(x => x.AddFullAddressAsync(It.IsAny<AddressInputModel>()))
              .ReturnsAsync(() => fakeAddressId);
            var companyService = new CompanyService(this.DbContext,addressService.Object);
            var companyInputModel = new CompanyInputModel { CompanyName = "Test",VatNumber="Test" };



            //Action
            await companyService.CreateAsync(companyInputModel, "test");

            //Assert
            var countOfCompanies = this.DbContext.RegisteredCompanies.Count();
            var expectedCountOfCompanies = 1;
            Assert.Equal(expectedCountOfCompanies, countOfCompanies);
            var countOfDefaultInvoiceOptions = this.DbContext.DefaultInvoiceOptions.Count();
            var expectedCountOfDefaultInvoiceOptions = 1;
            Assert.Equal(expectedCountOfDefaultInvoiceOptions, countOfDefaultInvoiceOptions);

        }
        [Fact]
        public async Task TryCreateAsyncThrowExceptionIfCompanyAlreadyExist()
        {

            //Arrange
            var addressService = new Mock<IAddressService>();
            addressService.Setup(x => x.AddFullAddressAsync(It.IsAny<AddressInputModel>()))
              .ReturnsAsync(() => fakeAddressId);
            var companyService = new CompanyService(this.DbContext, addressService.Object);
            await this.DbContext.RegisteredCompanies.AddAsync(new RegisteredCompany { VatNumber = "Test" });
            await this.DbContext.SaveChangesAsync();
            var companyInputModel = new CompanyInputModel { CompanyName = "Test", VatNumber = "Test" };



            //Action
            Func<Task> act = () => companyService.CreateAsync(companyInputModel, "test");

            //Assert
            var exception = await Assert.ThrowsAsync<InvalidUserDataException>(act);
            var expectedError = string.Format(ErrorMessages.CompanyAlreadyExist, "Test");
            Assert.Equal(expectedError, exception.Message);
         }


        [Fact]
        public async Task TGetCompanyInfoAsyncShouldReturnCompanyInfo()
        {

            //Arrange
            var addressService = new Mock<IAddressService>();
            var companyService = new CompanyService(this.DbContext, addressService.Object);
            var registeredCompany = new RegisteredCompany { VatNumber = "Test" };
            await this.DbContext.RegisteredCompanies.AddAsync(registeredCompany);
            await this.DbContext.SaveChangesAsync();

             //Action
            var company = await companyService.GetCompanyInfoAsync<CompanyViewModel>(registeredCompany.Id);

            //Assert
            var expectedVatNumber = "Test";
            Assert.Equal(expectedVatNumber, company.VatNumber);
            
        }
    }
}
