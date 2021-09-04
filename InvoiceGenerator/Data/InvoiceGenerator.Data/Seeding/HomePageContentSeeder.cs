using InvoiceGenerator.Common;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Data.Models.Enum;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Data.Seeding
{
    public class HomePageContentSeeder : ISeeder
    {
        public async Task SeedAsync(ApplicationDbContext context, IServiceProvider serviceProvider, IConfiguration configuration)
        {
            var homePageContents = new List<HomePageContent>{
                new HomePageContent
                {
                    Name = GlobalConstants.TopClientsForLastMonth,
                    BulgarainName = GlobalConstants.TopClientsForLastMonthBulgarianName,
                    Type=HomePageContentTypes.Table
                },
                new HomePageContent
                {
                    Name = GlobalConstants.TopArticlesForLastMonth,
                    BulgarainName = GlobalConstants.TopArticlesForLastMonthBulgarianName,
                    Type=HomePageContentTypes.Table
                },
                  new HomePageContent
                {
                    Name = GlobalConstants.IncomesForLast12Months,
                    BulgarainName = GlobalConstants.IncomesForLast12MonthsBulgarianName,
                    Type=HomePageContentTypes.Chart
                }
            };
            await SeedContentAsync(context, homePageContents);
        }

        public async  Task SeedContentAsync(ApplicationDbContext context,List<HomePageContent>list )
        {
           
            foreach (var content in list)
            {
                var contentFromDB = await context.HomePageContents.FirstOrDefaultAsync(x => x.Name == content.Name);
                if (contentFromDB!=null)
                {
                    continue;

                }
               await context.HomePageContents.AddAsync(content);
            }

            await context.SaveChangesAsync();
        }
    }
}
