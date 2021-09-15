using InvoiceGenerator.Common;
using InvoiceGenerator.Common.Resources;
using InvoiceGenerator.Data;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Data.Models.Enum;
using InvoiceGenerator.Services.Mapping;
using InvoiceGenerator.Web.Models.OfferedService;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;
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
        private readonly IStringLocalizer stringLocalizer;

        public OfferedServices(ApplicationDbContext context,IStringLocalizer<Messages> stringLocalizer)
        {
            this.context = context;
            this.stringLocalizer = stringLocalizer;
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

            return newService.Name;



        }

        public async Task<ICollection<T>> GetAllServicesAsync<T>(string companyId)
        {
            var services = await context.Services
                 .Where(x => x.CompanyId == companyId)
                 .To<T>()
                 .ToListAsync();
            
            return services;
        }

        public async  Task<string> UpdateStatusOfServiceAsync(ServiceUpdateModel input,string serviceId, string companyId )
        {
            var service = await context.Services.FirstOrDefaultAsync(x => x.Id == serviceId && x.CompanyId == companyId);
            if (service==null)
            {
                throw new InvalidUserDataException(stringLocalizer["NonExistentService",serviceId]);
               
            }

            service.Status = input.Status;
            await context.SaveChangesAsync();
            return service.Name;

            
        }
    }
}
