using InvoiceGenerator.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Services.Data
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext context;

        public UserService(ApplicationDbContext context)
        {
            this.context = context;
        }
        public Task AddCompany(string userId, string CompanyId)
        {
            throw new NotImplementedException();
        }

        public Task CreateUser()
        {
            throw new NotImplementedException();
        }

        public Task EditUser()
        {
            throw new NotImplementedException();
        }

        public async Task<string> GetUserCompanyId(string userId)
        {
            var companyId = await  context.Users
                .Select(x => x.CompanyId)
                .FirstOrDefaultAsync();

            return companyId;
        }

        public Task RemoveUser()
        {
            throw new NotImplementedException();
        }
       
    }
}
