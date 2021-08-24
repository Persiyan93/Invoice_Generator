using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Common
{
    public static class EmailMessages
    {
        public const string InvoiceEmailSubject = "Фактура  Nº{0} от ";
        public const string EmailTemplate = "Автоматично генерирани имейл във връзка с немплатена фактура Nº{0} от {1} издадена от фирма" +
                                                    " {2} на стойност {3}.Молим фактурата да бъде платена в най-кратък срок.При въпроси може да се свържете с фирмата на имейл:{4} ";
    }
}
