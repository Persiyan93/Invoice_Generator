using InvoiceGenerator.Data.Models.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.Client
{
   public  class ClientStatusUpdateModel
    {   
        [Required]
        public string ClientId { get; set; }

        [Required]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public ClientStatus Status { get; set; }
    }
}
