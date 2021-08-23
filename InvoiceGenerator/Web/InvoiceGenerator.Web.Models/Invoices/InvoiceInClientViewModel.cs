using InvoiceGenerator.Web.Models.JsonConverters;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Data.Models.Enum;
using InvoiceGenerator.Services.Mapping;
using System;

using System.Text.Json.Serialization;
using AutoMapper;

namespace InvoiceGenerator.Web.Models.Invoices
{
    public class InvoiceInClientViewModel
    {
        public string Id { get; set; }

        public decimal PriceWithVat{ get; set; }

        public int InvoiceNumber { get; set; }

        [JsonConverter(typeof(DateTimeConverter))]
        public DateTime DateOfIssue { get; set; }

        [JsonConverter(typeof(DateTimeConverter))]
        public DateTime PaymentDueDate { get; set; }

       
        public string   Status { get; set; }

    }
}
