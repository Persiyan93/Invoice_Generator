using InvoiceGenerator.Common;
using InvoiceGenerator.Data;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Web.Models.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Services.Data
{
    public class IdentityService : IIdentityService
    {
        private readonly ApplicationDbContext context;
        private readonly ICompanyService companyService;
        private readonly UserManager<ApplicationUser> userManager;

        public IdentityService(ApplicationDbContext context, ICompanyService companyService, UserManager<ApplicationUser> userManager)
        {
            this.context = context;
            this.companyService = companyService;
            this.userManager = userManager;
        }
        public async  Task RegisterUserAsync(RegisterInputModel  inputModel)
        {
            var user = await  context.Users.FirstOrDefaultAsync(u => u.Email == inputModel.Email || u.UserName == inputModel.UserName);
            if (user!=null)
            {
                throw new InvalidUserDataException(string.Format(ErrorMessages.UserAlreadyExist, inputModel.Email));
            }
            var company = await context.RegisteredCompanies
                .FirstOrDefaultAsync(x => x.VatNumber == inputModel.CompanyDetails.VatNumber && x.IsActive == true);
            if (company != null)
            {
                throw new InvalidUserDataException(ErrorMessages.CompanyAlreadyExist);
            }
            user = new ApplicationUser
            {
                Email = inputModel.Email,
                UserName = inputModel.UserName,
                Name = inputModel.UserName
            };
            var result = await userManager.CreateAsync(user, inputModel.Password);
            if (result.Succeeded)
            {
                var companyId=await companyService.CreateAsync(inputModel.CompanyDetails, user.Id);
                user.CompanyId = companyId;
                await context.SaveChangesAsync();
            }
            

            
           
        }
    }
}
