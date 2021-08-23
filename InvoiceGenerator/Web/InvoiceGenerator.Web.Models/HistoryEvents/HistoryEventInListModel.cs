using AutoMapper;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Data.Models.Enum;
using InvoiceGenerator.Services.Mapping;
using InvoiceGenerator.Web.Models.JsonConverters;
using System;
using System.Collections.Generic;

using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.HistoryEvents
{
    public class HistoryEventInListModel :IMapFrom<HistoryEvent>,IHaveCustomMappings
    {
        public string UserName { get; set; }

        public string UserId { get; set; }

        [JsonConverter(typeof(DateTimeConverter))]
        public DateTime DateOfEvent { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public HistoryEventType EventType { get; set; }

        public string AdditionalText { get; set; }

        public string BulgarianMessage { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {
            configuration.CreateMap<HistoryEvent, HistoryEventInListModel>()
                 .ForMember(x => x.UserName, opt =>
                        opt.MapFrom(h => h.User.Name))
                 .ForMember(x => x.UserId, opt =>
                               opt.MapFrom(h => h.UserId));
              
        }
    }
}
