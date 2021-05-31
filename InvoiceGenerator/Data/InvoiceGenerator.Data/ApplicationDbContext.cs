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
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            ConfigureUserIdentityRole(builder);
        }
        private void ConfigureUserIdentityRole(ModelBuilder builder) => builder.ApplyConfigurationsFromAssembly(this.GetType().Assembly);
    }
}
