using AutoMapper;
using InvoiceGenerator.Services.Mapping;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using InvoiceGenerator.Data.Models;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.Address
{
    public abstract class AddressModel
    { 
        [Required]
        public string AddressText { get; set; }

        [Required]
        public string Town { get; set; }

        [Required]
        public string Country { get; set; }

       
    }
}
