using InvoiceGenerator.Data.Models.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Data.Models
{
    public class HomePageContent
    {
        public HomePageContent()
        {
             this.HomePageContentToUsers = new HashSet<HomePageContentToUser>();
        }
        public int Id { get; set; }

        public string Name { get; set; }

        public string BulgarainName { get; set; }

        public HomePageContentTypes Type { get; set; }

        public ICollection<HomePageContentToUser> HomePageContentToUsers { get; set; }
    }
}
