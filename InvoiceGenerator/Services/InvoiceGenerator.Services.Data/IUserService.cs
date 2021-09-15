using InvoiceGenerator.Web.Models.AccessAreas;
using InvoiceGenerator.Web.Models.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Services.Data
{
    public interface IUserService
    {
        public  Task<ICollection<UsersInListViewModel>> GetAllUsersAsync(string companyId, DateTime startDate, DateTime endDate, string orderBy,
                                    string order , int page , int rowsPerPage ,string filterString );

        Task<T> GetUserHistoryAsync<T>(string userId);

        Task<string> ChangeUserStatusAsync(UpdateUserStatusModel input);

        Task<UserModel> GetUserInfoAsync(string userId);

        Task<string> UpdateUserAccessAsync(UserAccessModel input, string userId);


        


    }
}
