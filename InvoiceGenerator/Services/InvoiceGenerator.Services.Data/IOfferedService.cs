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

        Task<string> AddService(ServiceInputModel inputModel,string companyId);

        Task<ICollection<T>> GetAllServices<T>(string companyId);
    }
}
