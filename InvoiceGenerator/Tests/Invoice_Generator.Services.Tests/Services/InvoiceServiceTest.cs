using InvoiceGenerator.Common;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Data.Models.Enum;
using InvoiceGenerator.Services.Data;
using InvoiceGenerator.Web.Models.Invoices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Invoice_Generator.Services.Tests.Services
{
    public class InvoiceServiceTest:BaseServiceTest
    {
        private const string registeredCompanyId = "Test";
        private const string articleName = "Test article name";
        private const string articleId = "ArticleId";
        private const string userId = "TestUserId";

        [Fact]
        public async Task TryCreateInvoiceAsyncWithBlockedClient()
        {

            //Arrange
            var invoiceService = new InvoiceService(this.DbContext);
            var client = new Client { IsActive = true, Status = ClientStatus.Blocked ,Name="Test" };
            await this.DbContext.Clients.AddAsync(client);
            await this.DbContext.SaveChangesAsync();
            var input = new InvoiceInputModel { ClientId = client.Id };

            //Action
            Func<Task> act = () => invoiceService.CreateInvoiceAsync(input,registeredCompanyId,userId);

            //Assert
            var exception = await Assert.ThrowsAsync<InvalidUserDataException>(act);
            var expectedError = string.Format(ErrorMessages.BlockedClient, client.Name);
            Assert.Equal(expectedError, exception.Message);

        }

        [Fact]
        public async Task TryUpdateStatusOfInvoiceFromDifferentCompany()
        {

            //Arrange
            var invoiceService = new InvoiceService(this.DbContext);
            var invoice = new Invoice { SellerId = registeredCompanyId ,Status=InvoiceStatus.WaitingForPayment };
            await this.DbContext.AddAsync(invoice);
            await this.DbContext.SaveChangesAsync();
            var input = new UpdateInvoiceStatusInputModel { InvoiceIds = new List<string> { invoice.Id }, Status = InvoiceStatus.Paid };


            //Action
            Func<Task> act = () => invoiceService.UpdateStatusOfInvoicesAsync(input, "RandomCompanyId", "test");

            //Assert
            var exception = await Assert.ThrowsAsync<InvalidUserDataException>(act);
            var expectedError = ErrorMessages.ForeignInvoice;
            Assert.Equal(expectedError, exception.Message);

        }
        [Fact]
        public async Task UpdateStatusOfInvoiceShouldUpdateStatus()
        {

            //Arrange
            var invoiceService = new InvoiceService(this.DbContext);
            var invoice = new Invoice { SellerId = registeredCompanyId, Status = InvoiceStatus.WaitingForPayment };
            await this.DbContext.AddAsync(invoice);
            await this.DbContext.SaveChangesAsync();
            var input = new UpdateInvoiceStatusInputModel { InvoiceIds = new List<string> { invoice.Id }, Status = InvoiceStatus.Paid };


            //Action
            await invoiceService.UpdateStatusOfInvoicesAsync(input, registeredCompanyId, "test");

            //Assert
            var invoiceFromDb = this.DbContext.Invoices.FirstOrDefault();
            var expectedStatusOfInvoice = InvoiceStatus.Paid;
            Assert.Equal(expectedStatusOfInvoice,invoiceFromDb.Status);

        }


        [Fact]
        public async Task UpdateStatusofOverdueInvoicesAsyncShouldChangeInvoiceStatus()
        {

            //Arrange
            var invoiceService = new InvoiceService(this.DbContext);
            var invoice = new Invoice { SellerId = registeredCompanyId, Status = InvoiceStatus.WaitingForPayment ,PaymentDueDate=new DateTime(2020,10,10)};
            var companySerings = new DefaultInvoiceOptions { BlockClientWhenReachMaxCountOfUnpaidInvoices = false, CompanyId = registeredCompanyId };
            await this.DbContext.DefaultInvoiceOptions.AddAsync(companySerings);
            await this.DbContext.AddAsync(invoice);
            await this.DbContext.SaveChangesAsync();
            var input = new UpdateInvoiceStatusInputModel { InvoiceIds = new List<string> { invoice.Id }, Status = InvoiceStatus.Paid };


            //Action
            await invoiceService.UpdateStatusofOverdueInvoicesAsync();

            //Assert
            var invoiceFromDb = this.DbContext.Invoices.FirstOrDefault();
            var expectedStatusOfInvoice = InvoiceStatus.Overdue;
            Assert.Equal(expectedStatusOfInvoice, invoiceFromDb.Status);

        }
        

    }
}
