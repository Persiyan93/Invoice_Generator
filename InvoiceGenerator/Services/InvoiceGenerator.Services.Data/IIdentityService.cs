using InvoiceGenerator.Web.Models.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Services.Data
{
   public  interface IIdentityService
    {
        Task RegisterUserAsync(RegisterInputModel inputModel);
    }
}
