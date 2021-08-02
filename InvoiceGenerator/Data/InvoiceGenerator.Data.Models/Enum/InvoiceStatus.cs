using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Data.Models.Enum
{
    public enum  InvoiceStatus
    {
        
        Overdue=1,
        UnCompleted=2,
        WaitingForPayment=3
    }
}
