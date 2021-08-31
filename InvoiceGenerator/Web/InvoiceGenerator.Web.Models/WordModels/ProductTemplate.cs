using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.WordModels
{
    public abstract class ProductTemplate
    {
public string Name { get; set; }

        public double Quantity { get; set; }

        public decimal UnitPrice { get; set; }

        public string UnitType { get; set; }
    }
}
