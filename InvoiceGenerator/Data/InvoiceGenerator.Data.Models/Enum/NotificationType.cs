using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Data.Models.Enum
{
    public enum NotificationType
    {
        SendAutomaticGeneratedEmail=1,
        Paid=2,
        Overdue=3
    }
}
