using InvoiceGenerator.Data.Models.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.OfferedService
{
    public class ServiceUpdateModel
    {

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public ProductStatus Status { get; set; }
    }
}
