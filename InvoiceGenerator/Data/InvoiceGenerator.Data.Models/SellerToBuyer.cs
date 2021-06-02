using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Data.Models
{
    public class SellerToBuyer
    {
        public int Id { get; set; }

        public RegisteredCompany Seller { get; set; }

        public string SellerId { get; set; }

        public Company   Buyer  { get; set; }

        public string BuyerId { get; set; }
    }
}
