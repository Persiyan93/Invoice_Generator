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
        public Task<string> AddArticle(ArticleInputModel inputModel,string companyId,string articleId);

        public Task UpdateArticle(ArticleUpdateModel inputModel, string articleId,string userId);

        public Task<ICollection<T>> GetAllArticlesByCompanyId<T>(string companyId);

        public Task<T> GetArticleById<T>(string articleId);

        public Task UpdateArticleQuantity(string articleId ,double newQuantity ,string userId);

        public Task<ICollection<T>> GetTop10CompanyArticlesAsync<T>(string companyId);
    }
}
