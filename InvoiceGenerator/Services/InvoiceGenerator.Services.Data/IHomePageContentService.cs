using InvoiceGenerator.Web.Models.HomeContent;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Services.Data
{
    public interface IHomePageContentService
    {
        Task<ICollection<T>> GetUserHomePageContentAsync<T>(string userId);

        Task AddNewContentToHomePageAsync(string userId, string homePageContentId);

        Task<ICollection<T>> GetAllHomePageContetsWhichUserDoesNotUseAsync<T>(string userId);

        Task RemoveSelectedContentFromHomePageAsync(string contentId ,string userId);


    }
}
