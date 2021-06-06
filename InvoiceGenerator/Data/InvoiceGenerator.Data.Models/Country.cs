using System.Collections.Generic;

namespace InvoiceGenerator.Data.Models
{
    public class Country
    {
        public Country()
        {
            this.Towns = new HashSet<Town>();
        }
        public int Id { get; set; }

        public string  Name { get; set; }


        public ICollection<Town> Towns { get; set; }

    }
}