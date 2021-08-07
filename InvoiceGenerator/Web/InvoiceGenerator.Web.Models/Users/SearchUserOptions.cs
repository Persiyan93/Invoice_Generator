using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.Users
{
    public class SearchUserOptions
    {

        public DateTime BeginOfSearchedPeriod { get; set; }

        public DateTime EndOfSearchedPeriod { get; set; }
    }
}
