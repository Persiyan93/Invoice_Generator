using InvoiceGenerator.Web.Models.OfferedService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Services.Data
{
    public interface IOfferedService
    {

        Task<string> AddServiceAsync(ServiceInputModel inputModel,string companyId);

        Task<ICollection<T>> GetAllServicesAsync<T>(string companyId);

        Task<string> UpdateStatusOfServiceAsync(ServiceUpdateModel input,string serviceId, string companyId);
    }
}
