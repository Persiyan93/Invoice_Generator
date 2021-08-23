using InvoiceGenerator.Common;
using InvoiceGenerator.Data;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Data.Models.Enum;
using InvoiceGenerator.Services.Mapping;
using InvoiceGenerator.Web.Models.OfferedService;
using Microsoft.EntityFrameworkCore;
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
        public async Task<string> AddServiceAsync(ServiceInputModel inputModel, string companyId)
        {
            var newService = new Service
            {
                Name = inputModel.Name,
                DefaultPriceWithoutVat = inputModel.DefaultPrice,
                CompanyId = companyId,
                VatRate = inputModel.VatRate,
                Status = ProductStatus.Active
               
            };

            await context.Services.AddAsync(newService);
            await context.SaveChangesAsync();

            return newService.Id;



        }

        public async Task<ICollection<T>> GetAllServicesAsync<T>(string companyId)
        {
            var services = await context.Services
                 .Where(x => x.CompanyId == companyId)
                 .To<T>()
                 .ToListAsync();
            
            return services;
        }

        public async  Task UpdateStatusOfServiceAsync(ServiceUpdateModel input,string serviceId, string companyId )
        {
            var service = await context.Services.FirstOrDefaultAsync(x => x.Id == serviceId && x.CompanyId == companyId);
            if (service==null)
            {
                throw new InvalidUserDataException(string.Format(ErrorMessages.InvalidServiceId, serviceId));
               
            }

            service.Status = input.Status;

            await context.SaveChangesAsync();

            
        }
    }
}
