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
    public class InvoiceToArticleConfiguration : IEntityTypeConfiguration<InvoiceToArticle>
    {
        public void Configure(EntityTypeBuilder<InvoiceToArticle> builder)
        {
            builder.HasOne(x => x.Invoice)
                .WithMany(y => y.Articles)
                .HasForeignKey(x => x.InvoiceId);


            builder.HasOne(x => x.Article)
                .WithMany(y => y.Invoices)
                .HasForeignKey(x => x.ArticleId);
                
        }
    }
}
