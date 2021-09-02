using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Models.Invoices
{
   public  class InvoiceIncomesByMonthsViewModel
    {
        public int Year { get; set; }

        public int Month { get; set; }

        public int  InvoicesCount { get; set; }

        public decimal Incomes { get; set; }



    }
}
