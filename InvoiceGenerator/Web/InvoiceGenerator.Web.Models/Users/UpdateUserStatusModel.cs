using InvoiceGenerator.Data.Models.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.Users
{
    public class UpdateUserStatusModel
    {
        [Required]
        public string UserId { get; set; }

        [Required]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public UserStatus Status { get; set; }
    }
}
