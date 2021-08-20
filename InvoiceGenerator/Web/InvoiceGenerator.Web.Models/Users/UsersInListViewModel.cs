using AutoMapper;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Data.Models.Enum;
using InvoiceGenerator.Services.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.Users
{
    public class UsersInListViewModel 
    {
        public string Id { get; set; }

        public string FullName { get; set; }

        public string Email { get; set; }

        public int CountOfGeneratedInvoices { get; set; }

        public double SumOfAllInvoices { get; set; }

        public int CountOfOverduedInvoices { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public UserStatus Status { get; set; }


    }
}
