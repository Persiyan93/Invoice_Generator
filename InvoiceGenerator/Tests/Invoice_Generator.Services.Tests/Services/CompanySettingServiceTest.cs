using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Services.Data;
using InvoiceGenerator.Web.Models.Company;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Invoice_Generator.Services.Tests.Services
{
    public class CompanySettingServiceTest:BaseServiceTest
    {
        private const string registeredCompanyId = "Test";
        [Fact]  
        public async Task GetCompanySettingsShouldReturnCompanySettings()
        {

            //Arrange

            var companySettingsService = new CompanySettingsService(this.DbContext);
            var companySettings = new CompanySettings { CompanyId = registeredCompanyId };
            await this.DbContext.CompanySettings.AddAsync(companySettings);
            await this.DbContext.SaveChangesAsync();


            //Action
            var options = await companySettingsService.GetCompanySettingsAsync(registeredCompanyId);


            //Assert
            Assert.NotNull(options);

        }

        [Fact]
        public async Task UpdateCompanySettingsShouldChangeDefaultInvoiceOptions()
        {

            //Arrange

            var companySettingsService = new CompanySettingsService(this.DbContext);
            var companySettings = new CompanySettings { CompanyId = registeredCompanyId,DefaultPaymentTerm=50 };
            await this.DbContext.CompanySettings.AddAsync(companySettings);
            await this.DbContext.SaveChangesAsync();
            var newCompanySettings = new CompanySettingsModel {DefaultPaymentTerm=10 };



            //Action
            await companySettingsService.UpdateComapnySettingsAsync(registeredCompanyId, newCompanySettings);


            //Assert
            var countOfSettings = this.DbContext.CompanySettings.Count();
            Assert.Equal(1, countOfSettings);
            var settings = this.DbContext.CompanySettings.FirstOrDefault();
            var expectedDefaultPaymentTerm = 10;
            Assert.Equal(expectedDefaultPaymentTerm, settings.DefaultPaymentTerm);

        }
    }
}
