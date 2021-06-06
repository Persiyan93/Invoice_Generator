﻿using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace InvoiceGenerator.Data.Models
{
    public class ApplicationUser:IdentityUser
    {
        public ApplicationUser()
        {
            this.Id = Guid.NewGuid().ToString();
            this.Roles = new HashSet<IdentityUserRole<string>>();
            this.Claims = new HashSet<IdentityUserClaim<string>>();
            this.Logins = new HashSet<IdentityUserLogin<string>>();
        }

        public string Name { get; set; }

        public Company Company { get; set; }

        public string CompanyId { get; set; }

        public virtual ICollection<IdentityUserRole<string>> Roles { get; set; }

        public virtual ICollection<IdentityUserClaim<string>> Claims { get; set; }

        public virtual ICollection<IdentityUserLogin<string>> Logins { get; set; }

       


    }
}
