using AutoMapper;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Data.Models.Enum;
using InvoiceGenerator.Services.Mapping;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.Notifications
{
    public class NotificationViewModel :IMapFrom<Notification> ,IHaveCustomMappings
    {
        
        public string Id { get; set; }

        
        public  string Type { get; set; }

        public string Message { get; set; }

        public string Date { get; set; }

        public void CreateMappings(IProfileExpression configuration)
        {

            configuration.CreateMap<Notification, NotificationViewModel>()
                .ForMember(x => x.Id, opt =>
                               opt.MapFrom(x => x.NotificationId));
               
               
        }
    }
}
