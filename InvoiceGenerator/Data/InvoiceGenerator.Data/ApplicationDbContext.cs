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
        public DbSet<Address> Addresses { get; set; }

        public DbSet<Article> Articles { get; set; }

        public DbSet<Company> Companies { get; set; }

        public DbSet<RegisteredCompany> RegisteredCompanies { get; set; }

        public DbSet<Country> Country { get; set; }

        public DbSet<Invoice> Invoices { get; set; }

        public DbSet<Town> Towns { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            ConfigureUserIdentityRole(builder);
        }
        private void ConfigureUserIdentityRole(ModelBuilder builder) => builder.ApplyConfigurationsFromAssembly(this.GetType().Assembly);
    }
}
