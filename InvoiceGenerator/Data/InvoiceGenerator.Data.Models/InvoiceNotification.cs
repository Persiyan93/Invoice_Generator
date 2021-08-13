﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Data.Models
{
    public class InvoiceNotification:Notification
    {
        public string InvoiceId { get; set; }

        public Invoice Invoice { get; set; }
    }
}
