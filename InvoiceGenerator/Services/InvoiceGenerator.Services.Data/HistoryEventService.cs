using InvoiceGenerator.Data;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Data.Models.Enum;
using InvoiceGenerator.Services.Mapping;
using InvoiceGenerator.Web.Models.HistoryEvents;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Services.Data
{
    public class HistoryEventService : IHistoryEventService
    {
        private readonly ApplicationDbContext context;

        public HistoryEventService(ApplicationDbContext context)
        {
            this.context = context;
        }

        public ICollection<string> GetEventTypes()
        {
            var eventTypes = Enum.GetValues(typeof(HistoryEventType));
            var result = new List<string>();
            foreach (var eventType in eventTypes)
            {
                result.Add(eventType.ToString());
            }


            return result;
        }



        public async Task<ICollection<HistoryEventInListModel>> GetHistoryAsync(string companyId, DateTime startDate,
                                    DateTime endDate,  string order, string orderBy, string eventType, string userId)
        {

            var ordebyDesc = order == "desc";

            var historyEventQuery =  context.HistoryEvents
                .Where(x => DateTime.Compare(x.DateOfEvent, startDate) >= 0
                            && DateTime.Compare(x.DateOfEvent, (endDate.AddDays(1))) <= 0
                            &&x.CompanyId==companyId);
            if (!string.IsNullOrEmpty(userId))
            {
                historyEventQuery = historyEventQuery.Where(x => x.UserId == userId);
            }
            if (!string.IsNullOrEmpty(eventType))
            {
                
                object historyEventType;
               var isSuccess= Enum.TryParse((typeof(HistoryEventType)), eventType, out historyEventType);
             
                var p = historyEventType.ToString();
                if (isSuccess)
                {
                   historyEventQuery = historyEventQuery.Where(x => (int)x.EventType==(int)historyEventType);
                }

            };

            var events = await historyEventQuery
                .Select(e => new HistoryEventInListModel
                {
                    UserId = e.UserId,
                    UserName = e.User.Name,
                    DateOfEvent = e.DateOfEvent,
                    EventType = e.EventType,
                    AdditionalText = e.AdditionalText,
                    BulgarianMessage = e.BulgarianMessage
                })
                .CustomOrderBy(orderBy, ordebyDesc)
               .ToListAsync();

            return events;

        }

   

        public async  Task<ICollection<HistoryEventInListModel>> GetInvoiceEventsAsync(string invoiceId,string companyId)
        {
            var invoiceEvents = await context.InvoiceHistoryEvents
                                  .Where(x=>x.InvoiceId==invoiceId &&x.CompanyId==companyId)
                                 .To<HistoryEventInListModel>()
                                 .ToListAsync();

            return invoiceEvents;
        }
       
    }
}


