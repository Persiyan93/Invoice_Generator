using InvoiceGenerator.Data.Models.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.Articles
{
    public class ArticleUpdateModel
    {
        public decimal UnitPrice { get; set; }

        public double VatRate { get; set; }

        public double Quantity { get; set; }

        public bool QuantityMonitoring { get; set; }

        public double QuantityLoweLimit { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public ProductStatus   Status { get; set; }

        public string AdditionalText { get; set; }
    }
}
