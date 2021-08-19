using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Data.Models
{
   public  class HomePageContentToUser
    {
        public HomePageContentToUser()
        {
            this.Id = Guid.NewGuid().ToString();
        }
        public string Id { get; set; }

        public string UserId { get; set; }

        public ApplicationUser User { get; set; }

        public string HomePageContentId { get; set; }

        public HomePageContent HomePageContent { get; set; }
    }
}
