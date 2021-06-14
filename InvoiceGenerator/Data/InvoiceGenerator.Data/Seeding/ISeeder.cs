using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Data.Seeding
{
    public interface ISeeder
    {
        Task SeedAsync(ApplicationDbContext context, IServiceProvider serviceProvider, IConfiguration configuration);
    }
}
