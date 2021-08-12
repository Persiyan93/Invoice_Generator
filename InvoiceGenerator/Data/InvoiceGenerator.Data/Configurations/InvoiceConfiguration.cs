using InvoiceGenerator.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Data.Configurations
{
    public class InvoiceConfiguration : IEntityTypeConfiguration<Invoice>
    {
        public void Configure(EntityTypeBuilder<Invoice> builder)
        {

            builder.HasOne(x => x.Seller)
                .WithMany(s => s.Invoices)
                .HasForeignKey(x => x.SellerId);

            builder.HasMany(x => x.Articles)
                .WithOne(a => a.Invoice)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
