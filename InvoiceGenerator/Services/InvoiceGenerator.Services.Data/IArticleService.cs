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
        public Task<string> AddArticle(ArticleInputModel inputModel,string companyId);

        public Task UpdateArticle(UpdateArticleModel inputModel, string articleId,string userId);

        public Task<ICollection<T>> GetAllArticlesByCompanyId<T>(string companyId);

        public Task<T> GetArticleById<T>(string articleId);
    }
}
