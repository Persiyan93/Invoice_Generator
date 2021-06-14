using InvoiceGenerator.Data.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Data.Seeding
{
    public class RoleSeeder : ISeeder
    {
        public  async Task SeedAsync(ApplicationDbContext context, IServiceProvider serviceProvider, IConfiguration configuration)
        {
            var rolemanager = serviceProvider.GetRequiredService<RoleManager<ApplicationRole>>();
            await SeedRoleAsync(rolemanager, "AdministratorOfCompany");
            

        }
        private static async Task SeedRoleAsync(RoleManager<ApplicationRole> roleManager,string roleName)
        {
            var role = await roleManager.FindByNameAsync(roleName);
            if (role==null)
            {
                await roleManager.CreateAsync(new ApplicationRole(roleName));
            }
        }
    }
}
