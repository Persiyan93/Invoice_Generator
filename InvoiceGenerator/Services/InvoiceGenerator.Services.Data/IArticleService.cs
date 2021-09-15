using InvoiceGenerator.Web.Models.Articles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Services.Data
{
    public interface IArticleService
    {
        public Task<string> AddArticleAsync(ArticleInputModel inputModel,string companyId,string articleId);

        public Task<string> UpdateArticleAsync(ArticleUpdateModel inputModel, string articleId,string userId);

        public Task<ICollection<T>> GetAllArticlesByCompanyIdAsync<T>(string companyId);

        public Task<T> GetArticleByIdAsync<T>(string articleId);

        public Task<string> UpdateArticleQuantityAsync(string articleId ,double newQuantity ,string userId);

        public Task<ICollection<T>> GetTop10CompanyArticlesAsync<T>(string companyId);
    }
}
