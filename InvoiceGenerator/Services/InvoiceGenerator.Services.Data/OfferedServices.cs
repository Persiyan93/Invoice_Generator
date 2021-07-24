using InvoiceGenerator.Data;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Web.Models.OfferedService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Services.Data
{
    public class OfferedServices : IOfferedService


    {
        private readonly ApplicationDbContext context;

        public OfferedServices(ApplicationDbContext context)
        {
            this.context = context;
        }
        public async Task<string> AddService(ServiceInputModel inputModel, string companyId)
        {
            var newService = new Service
            {
                Name = inputModel.Name,
                DefaultPriceWithoutVat = inputModel.DefaultPrice,
                CompanyId = companyId,
                VatRate = inputModel.VatRate
            };

            await context.Services.AddAsync(newService);
            await context.SaveChangesAsync();

            return newService.Id;



        }
    }
}
