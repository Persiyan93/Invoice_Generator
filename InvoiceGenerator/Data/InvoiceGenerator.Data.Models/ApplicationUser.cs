using InvoiceGenerator.Data.Models.Enum;
using Microsoft.AspNetCore.Identity;
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
            this.InvoiceHistoryEvents = new HashSet<InvoiceHistoryEvent>();
            this.ArticleHistoryEvents = new HashSet<ArticleHistoryEvent>();
            this.UserHomePageContent = new HashSet<HomePageContentToUser>();
            this.Events = new HashSet<HistoryEvent>();
        }

        public string Name { get; set; }

        public RegisteredCompany Company { get; set; }

        public string CompanyId { get; set; }

        public UserStatus Status { get; set; }

        public virtual ICollection<IdentityUserRole<string>> Roles { get; set; }

        public virtual ICollection<IdentityUserClaim<string>> Claims { get; set; }

        public virtual ICollection<IdentityUserLogin<string>> Logins { get; set; }

        public ICollection<InvoiceHistoryEvent> InvoiceHistoryEvents{ get; set; }

        public ICollection<ArticleHistoryEvent> ArticleHistoryEvents{ get; set; }

        public ICollection<HistoryEvent> Events { get; set; }

        public ICollection<NotificationToUser> Notifications{ get; set; }
        
        public ICollection<HomePageContentToUser> UserHomePageContent { get; set; }




    }
}
