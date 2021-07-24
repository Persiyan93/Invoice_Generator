﻿using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Data.Models.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.Articles
{
    public class ArticleInputModel 
    {

        [Required]
        public string Name { get; set; }

        [Required]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public ArticleUnitType UnitType { get; set; }

        [Required]
        public double  VatRate { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        public double Quantity { get; set; }







    }
}
