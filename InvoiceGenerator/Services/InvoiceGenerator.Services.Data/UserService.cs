using InvoiceGenerator.Common;
using InvoiceGenerator.Data;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Data.Models.Enum;
using InvoiceGenerator.Web.Models.AccessAreas;
using InvoiceGenerator.Web.Models.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

using System.Threading.Tasks;

namespace InvoiceGenerator.Services.Data
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext context;
        private readonly UserManager<ApplicationUser> userManager;

        public UserService(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            this.context = context;
            this.userManager = userManager;
        }

        public async Task ChangeUserStatus(UpdateUserStatusModel input)
        {
            var user = await context.Users.FirstOrDefaultAsync(x => x.Id == input.UserId);

            user.Status = input.Status;
            await context.SaveChangesAsync();
        }



        public async Task<ICollection<UsersInListViewModel>> GetAllUsersAsync(string companyId, DateTime startDate, DateTime endDate,
            string orderBy, string order, int page, int rowsPerPage, string filterString)
        {
            
            var ordebyDesc = orderBy == "desc";
            var users = await context.Users.Where(x => x.CompanyId == companyId)
                .ContainsText(x => "Name", filterString)
                .Select(x => new UsersInListViewModel
                {
                    FullName = x.Name,
                    Id = x.Id,
                    Email = x.Email,
                    CountOfGeneratedInvoices = x.InvoiceHistoryEvents
                                .Where(e => e.EventType == HistoryEventType.CreateInvoice &&
                                                DateTime.Compare(e.Invoice.IssueDate, startDate) >= 0 &&
                                                DateTime.Compare(e.Invoice.IssueDate, endDate) <= 0)
                                .Count(),
                    SumOfAllInvoices = (double)x.InvoiceHistoryEvents
                                .Where(e => DateTime.Compare(e.Invoice.IssueDate, startDate) >= 0 &&
                                            DateTime.Compare(e.Invoice.IssueDate, endDate) <= 0)
                                .Sum(e => e.Invoice.PriceWithoutVat + e.Invoice.VatValue),

                    CountOfOverduedInvoices = x.InvoiceHistoryEvents
                                .Where(e => e.EventType == HistoryEventType.OverdueInvoice &&
                                                DateTime.Compare(e.Invoice.IssueDate, startDate) >= 0 &&
                                                DateTime.Compare(e.Invoice.IssueDate, endDate) <= 0)
                                .Count(),
                    Status = x.Status

                })
                .CustomOrderBy(orderBy, ordebyDesc)
                .Skip(rowsPerPage * (page - 1))
                .Take(rowsPerPage)
                .ToListAsync();


            return users;

        }



        public Task<T> GetUserHistory<T>(string userId)
        {
            throw new NotImplementedException();
        }


        public async Task<UserModel> GetUserInfoAsync(string userId)
        {
            var user = await context.Users.FirstOrDefaultAsync(x => x.Id == userId);

            var access = await getUserPermissins(user);

            var result = new UserModel
            {
                FullName = user.Name,
                Email = user.Email,
                AccessAreas = access,
                UserName = user.UserName
            };
            return result;

        }

      
        public async  Task UpdateUserAccessAsync(UserAccessModel input, string userId)
        {
            var user =await  userManager.FindByIdAsync(userId);
            var properties = input.GetType().GetProperties();
            if (input.EmailAccess)
            {
                await userManager.AddToRoleAsync(user, GlobalConstants.EmailAccessRole);
            }
            else if (input.EmailAccess == false)
            {
                await userManager.RemoveFromRoleAsync(user, GlobalConstants.EmailAccessRole);
            }
            if (input.InvoiceAccess)
            {
                await userManager.AddToRoleAsync(user, GlobalConstants.InvoiceAccessRole);
            }
            else if (input.InvoiceAccess == false)
            {
                await userManager.RemoveFromRoleAsync(user, GlobalConstants.InvoiceAccessRole);
            }
            if (input.UsersAccess)
            {
                await userManager.AddToRoleAsync(user, GlobalConstants.UsersAccessRole);
            }
            else if (input.UsersAccess == false)
            {
                await userManager.RemoveFromRoleAsync(user, GlobalConstants.UsersAccessRole);
            }
            if (input.ProductsAccess)
            {
                await userManager.AddToRoleAsync(user, GlobalConstants.ProductsAccessRole);
            }
            else if (input.ProductsAccess == false)
            {
                await userManager.RemoveFromRoleAsync(user, GlobalConstants.ProductsAccessRole);
            }
          
            //foreach (var propery in properties)
            //{
            //    var propertyName = propery.Name;
            //  var propertyValue= (bool) propery.GetValue(input);
            //    if (propertyValue)
            //    {
            //        var rolename = propertyName + "Role";
            //        await userManager.AddToRoleAsync(user, rolename);
            //    }
            //    else
            //    {
            //        await userManager.RemoveFromRoleAsync(user, propertyName + "Role");
            //    }
            //}
        }

        private async Task<UserAccessModel> getUserPermissins(ApplicationUser user)
        {
            var userRoles = await userManager.GetRolesAsync(user);
            var userPermission = new UserAccessModel();
            foreach (var userRole in userRoles)
            {
                switch (userRole)
                {
                    case GlobalConstants.EmailAccessRole:
                        userPermission.EmailAccess = true;
                        break;
                    case GlobalConstants.InvoiceAccessRole:
                        userPermission.InvoiceAccess = true;
                        break;
                    case GlobalConstants.ProductsAccessRole:
                        userPermission.ProductsAccess = true;
                        break;
                    case GlobalConstants.UsersAccessRole:
                        userPermission.UsersAccess = true;
                        break;
                    default:
                        userPermission.EmailAccess = true;
                        userPermission.InvoiceAccess = true;
                        userPermission.ProductsAccess = true;
                        userPermission.UsersAccess = true;
                        break;
                }

            }
            return userPermission;

        }
    }
}
