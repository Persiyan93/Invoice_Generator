using InvoiceGenerator.Common;
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
        public async Task SeedAsync(ApplicationDbContext context, IServiceProvider serviceProvider, IConfiguration configuration)
        {
            var rolemanager = serviceProvider.GetRequiredService<RoleManager<ApplicationRole>>();
            var roles = new List<string>{
                GlobalConstants.AdministratorOfCompany,
                GlobalConstants.EmailAccessRole,
                GlobalConstants.InvoiceAccessRole,
                GlobalConstants.UsersAccessRole,
                GlobalConstants.ProductsAccessRole,

            };
            await SeedRoleAsync(rolemanager, roles);


        }
        private static async Task SeedRoleAsync(RoleManager<ApplicationRole> roleManager, ICollection<string> roles )
        {
            foreach (var roleName in roles)
            {
                var role = await roleManager.FindByNameAsync(roleName);
                if (role == null)
                {
                    await roleManager.CreateAsync(new ApplicationRole(roleName));
                }
            }
            
        }
    }
}
