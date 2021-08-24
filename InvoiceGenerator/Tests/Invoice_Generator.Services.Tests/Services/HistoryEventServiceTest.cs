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

        [Fact]
        public async Task GetHistoryAsynShouldReturnAllEventsInCompany()
        {
            //Arrange
            var invoiceId = "TestInvoiceId";
            var historyEventService = new HistoryEventService(this.DbContext);
            var historyEvent = new InvoiceHistoryEvent { InvoiceId = invoiceId, CompanyId = registeredCompanyId ,DateOfEvent=new DateTime(2021,7,20) };
            await this.DbContext.InvoiceHistoryEvents.AddAsync(historyEvent);
            await this.DbContext.SaveChangesAsync();

            var userId = "";
            var orderBy = "DateOfEvent";
            var order = "asc";
            var startDate = new DateTime(2021, 3, 10);
            var endDate = DateTime.Now;
            var eventType = "";
            //Action
            var events = await historyEventService.GetHistoryAsync(registeredCompanyId, startDate,
                                     endDate, order, orderBy, eventType, userId);

            //Assert
            var countOfEvents = events.Count;
            var expectedCountOfEvents = 1;
            Assert.Equal(expectedCountOfEvents, countOfEvents);
        }

    }
}
