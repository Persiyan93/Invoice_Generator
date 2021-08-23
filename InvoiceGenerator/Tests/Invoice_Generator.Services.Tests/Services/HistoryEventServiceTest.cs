using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Services.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Invoice_Generator.Services.Tests.Services
{
    public class HistoryEventServiceTest:BaseServiceTest
    {
        private const string registeredCompanyId = "Test";
        [Fact]
        public void ShouldReturnHistoryEventServices()
        {
                //Arrange
            var historyEventService = new HistoryEventService(this.DbContext);
        
            //Action
            var eventTypes = historyEventService.GetEventTypes();
           
            //Assert
            var countOfEventTypes = eventTypes.Count();
            Assert.NotEqual(0, countOfEventTypes);
        }

       

              [Fact]
        public async Task GetInvoiceEventsAsyncShouldReturnInvoiceEvents()
        {
            //Arrange
            var invoiceId = "TestInvoiceId";
            var historyEventService = new HistoryEventService(this.DbContext);
            var historyEvent = new InvoiceHistoryEvent { InvoiceId = invoiceId,CompanyId=registeredCompanyId };
            await this.DbContext.InvoiceHistoryEvents.AddAsync(historyEvent);
            await this.DbContext.SaveChangesAsync();


            //Action
            var invoiceEvents =await  historyEventService.GetInvoiceEventsAsync(invoiceId, registeredCompanyId);

            //Assert
            var countOfInvoiceEvents = invoiceEvents.Count();
            var expectedCountOfInvoiceEvents = 1;
            Assert.Equal(expectedCountOfInvoiceEvents, countOfInvoiceEvents);
        }

    }
}
