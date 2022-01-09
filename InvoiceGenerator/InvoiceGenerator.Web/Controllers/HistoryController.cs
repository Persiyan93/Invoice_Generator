using InvoiceGenerator.Services.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace InvoiceGenerator.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class HistoryController : ControllerBase
    {
        private readonly IHistoryEventService historyEventService;
        public HistoryController(IHistoryEventService historyEventService)
        {
            this.historyEventService = historyEventService;
        }


        [HttpGet]
        [Route("EventTypes")]
        public IActionResult GetEventTypes()
        {
            var eventTypes = historyEventService.GetEventTypes();
            return this.Ok(eventTypes);
        }

        [HttpGet]
        [Route("InvoiceHistory/{invoiceId}")]
        public async Task<IActionResult> GetInvoiceHistory(string invoiceId)
        {
            var companyId = this.User.Claims.FirstOrDefault(x => x.Type == "companyId").Value;
            var invoiceHistory = await historyEventService.GetInvoiceEventsAsync(invoiceId, companyId);

            return this.Ok(invoiceHistory);
        }
        [HttpGet]
        public async Task<IActionResult> GetEvents(DateTime startDate, DateTime endDate, int page = 0, int rowsPerPage = 10, string order = "asc", string orderBy = "DateOfEvent", string EventType = "",
                                            string userId = "")
        {
            var companyId = this.User.Claims.FirstOrDefault(x => x.Type == "companyId").Value;
            var historyEvents = await historyEventService.GetHistoryAsync(companyId, startDate, endDate, order, orderBy, EventType,
                                            userId);
            var countOfEvents = historyEvents.Count;
            var filteredEvents = historyEvents
                .Skip(rowsPerPage * page)
                .Take(rowsPerPage)
                .ToList();

            return this.Ok(new { FilteredEvents = filteredEvents, CountOfAllEvents = countOfEvents });
        }


    }
}
