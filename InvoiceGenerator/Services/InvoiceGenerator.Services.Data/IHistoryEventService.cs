using InvoiceGenerator.Web.Models.HistoryEvents;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Services.Data
{
    public interface IHistoryEventService
    {
        public Task<ICollection<HistoryEventInListModel>> GetHistoryAsync(string companyId,  DateTime startDate, 
                                    DateTime endDate,  string order, string orderBy, string EventType,string userId);

        public ICollection<string> GetEventTypes();

        public Task<ICollection<HistoryEventInListModel>> GetInvoiceEventsAsync(string invoiceId,string companyId);
    }
}
