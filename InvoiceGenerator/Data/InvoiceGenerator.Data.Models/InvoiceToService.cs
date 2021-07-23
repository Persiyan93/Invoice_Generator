using System;

namespace InvoiceGenerator.Data.Models
{
    public class InvoiceToService
    {

        public InvoiceToService()
        {
            this.Id = Guid.NewGuid().ToString();
        }
        public string Id { get; set; }

        public Invoice Invoice { get; set; }

        public string InvoiceId { get; set; }

        public Service Service { get; set; }

        public string ServiceId { get; set; }

        public decimal PriceWithoutVat { get; set; }

        public double Quantity { get; set; }

        public string AdditionalInfo { get; set; }

    }
}