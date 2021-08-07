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
    public class HistoryEventConfiguration : IEntityTypeConfiguration<HistoryEvent>
    {
        public void Configure(EntityTypeBuilder<HistoryEvent> builder)
        {
            builder.HasDiscriminator<string>("TypeOfHistoryEvent")
                   .HasValue<ArticleHistoryEvent>("ArticleHistoryEvent")
                   .HasValue<InvoiceHistoryEvent>("InvoiceHistoryEvent");
        }
    }
}
