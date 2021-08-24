using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Common
{
   public static class GlobalConstants
    {
        public const string InvoiceTemplatePath = @".\InvoiceTemplate.docx";
        public const string InvoiceAccessRole="ÏnvoiceAccessRole";
        public const string EmailAccessRole = "EmailAccessRole";  
        public const string ProductsAccessRole = "ProductsAccessRole";  
        public const string UsersAccessRole  = "UserAccessRole";
        public const string AdministratorOfCompany = "AdministratorOfCompany";
        //public const string InvoiceсSplitByMonthsFor12Months  = "Invoices split by months";
        //public const string InvoiceсSplitByMonthsFor12MonthsBulgarianName  = "Фактури разделени по месеци";

        public const string TopArticlesForLastMonth = "Top articles for last month";
        public const string TopArticlesForLastMonthBulgarianName = "Най продавани артикули за последния месец";
        public const string TopClientsForLastMonth = "Top clients for last month";
        public const string TopClientsForLastMonthBulgarianName = "Най-добрите клиенти за последния месец";
  


    }
}
