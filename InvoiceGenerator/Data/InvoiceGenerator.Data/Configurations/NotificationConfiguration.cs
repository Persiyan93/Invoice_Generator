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
    public class NotificationConfiguration : IEntityTypeConfiguration<Notification>
    {
        public void Configure(EntityTypeBuilder<Notification> builder)
        {
            builder.HasDiscriminator<string>("TypeOfNotification")
                    .HasValue<ArticleNotification>("ArticleHistoryEvent")
                    .HasValue<InvoiceNotification>("InvoiceHistoryEvent");
        }
    }
}
