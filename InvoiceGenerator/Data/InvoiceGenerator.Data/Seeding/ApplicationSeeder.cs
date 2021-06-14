using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Data.Seeding
{
    public class ApplicationSeeder : ISeeder
    {
        public async Task SeedAsync(ApplicationDbContext context, IServiceProvider serviceProvider, IConfiguration configuration)
        {
            var seeders = new List<ISeeder>
            {
                new RoleSeeder()
            };
            foreach ( var seeder in seeders)
            {
                await seeder.SeedAsync(context, serviceProvider, configuration);
                await context.SaveChangesAsync();
            }
        }
    }
}
