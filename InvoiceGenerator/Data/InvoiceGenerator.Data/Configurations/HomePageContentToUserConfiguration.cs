using InvoiceGenerator.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace InvoiceGenerator.Data.Configurations
{
    public class HomePageContentToUserConfiguration : IEntityTypeConfiguration<HomePageContentToUser>
    {
        public void Configure(EntityTypeBuilder<HomePageContentToUser> builder)
        {
            builder.HasOne(x => x.HomePageContent)
               .WithMany(s => s.HomePageContentToUsers)
               .HasForeignKey(x => x.HomePageContentId);

            builder.HasOne(x => x.User)
                .WithMany(u => u.UserHomePageContent)
                .HasForeignKey(x => x.UserId);
        }
    }
}
