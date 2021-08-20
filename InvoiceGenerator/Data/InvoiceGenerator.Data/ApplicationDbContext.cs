using InvoiceGenerator.Data.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

using Microsoft.EntityFrameworkCore;
using System;

namespace InvoiceGenerator.Data
{
    public class ApplicationDbContext:IdentityDbContext<ApplicationUser,ApplicationRole,string>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            :base(options)
        {

        }
        
        
        public DbSet<Service> Services { get; set; }

        public DbSet<Notification> Notifications { get; set; }

        public DbSet<Address> Addresses { get; set; }

        public DbSet<Article> Articles { get; set; }

        public DbSet<Client> Clients { get; set; }

        public DbSet<ContactPerson> ContactPeople { get; set; }

        public DbSet<RegisteredCompany> RegisteredCompanies { get; set; }

        public DbSet<Country> Countries { get; set; }

        public DbSet<Invoice> Invoices { get; set; }

        public DbSet<Town> Towns { get; set; }

        public DbSet<HomePageContent> HomePageContents { get; set; }

        public DbSet<DefaultInvoiceOptions> DefaultInvoiceOptions { get; set; }

        public DbSet<Email> Emails { get; set; }

        public DbSet<HistoryEvent> HistoryEvents { get; set; }
        public DbSet<ArticleHistoryEvent> ArticleHistoryEvents { get; set; }
        public DbSet<InvoiceHistoryEvent> InvoiceHistoryEvents { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            ConfigureUserIdentityRole(builder);
            builder.HasSequence<int>("InvoiceNumbers", schema: "shared")
                .StartsAt(00000001)
                .IncrementsBy(1);
            builder.Entity<Invoice>()
                .Property(i => i.InvoiceNumber)
                .HasDefaultValueSql("NEXT VALUE FOR shared.InvoiceNumbers");
        }
        private void ConfigureUserIdentityRole(ModelBuilder builder) => builder.ApplyConfigurationsFromAssembly(this.GetType().Assembly);
    }
}
