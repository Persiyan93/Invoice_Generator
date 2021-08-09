using InvoiceGenerator.Data.Models.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Common
{
    public static class StringConverter
    {
        public static string TranslateCompanyTypeToBulgarianLanguage(TypeOfCompany companyType)
        {
           string result = "";
            switch (companyType)
            {
                case TypeOfCompany.JoinStockCompany:
                    result = "АД";
                    break;
                case TypeOfCompany.LtdWithOneOwner:
                    result = "ЕООД";
                    break;
                case TypeOfCompany.Ltd:
                    result = "ООД";
                    break; 
                case TypeOfCompany.SoleТrader:
                    result = "ET";
                    break;

                default:
                    break;
            }
            return result;
        }
    }
}
