using InvoiceGenerator.Data;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Services.Mapping;
using InvoiceGenerator.Web.Models.Client;
using InvoiceGenerator.Web.Models.Invoices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Invoice_Generator.Services.Tests.Services
{
    public class BaseServiceTest : IDisposable
    {

        public BaseServiceTest()
        {
            var services = this.SetServices();

            this.ServiceProvider = services.BuildServiceProvider();
            this.DbContext = this.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        }
        protected IServiceProvider ServiceProvider { get; set; }

        protected ApplicationDbContext DbContext { get; set; }
        private ServiceCollection SetServices()
        {
            var services = new ServiceCollection();

            services.AddDbContext<ApplicationDbContext>(
             opt => opt.UseInMemoryDatabase(Guid.NewGuid().ToString()));

            //AutoMapper
            AutoMapperConfig.RegisterMappings(typeof(ClientInListViewModel).GetTypeInfo().Assembly);


            var context = new DefaultHttpContext();
            services.AddSingleton<IHttpContextAccessor>(new HttpContextAccessor { HttpContext = context });

            return services;
        }
        public void Dispose()
        {
             DbContext.Database.EnsureDeleted();
            this.SetServices();
        }

    }
}
