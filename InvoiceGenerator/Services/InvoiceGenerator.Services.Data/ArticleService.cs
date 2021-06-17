using InvoiceGenerator.Common;
using InvoiceGenerator.Data;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Services.Mapping;
using InvoiceGenerator.Web.Models.Articles;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Services.Data
{
    public class ArticleService : IArticleService
    {
        private readonly ApplicationDbContext context;

        public ArticleService(ApplicationDbContext context)
        {
            this.context = context;
        }
        public async Task<string> AddArticle(ArticleInputModel inputModel)
        {
            var company = context.RegisteredCompanies
                .FirstOrDefault(x => x.IsActive == true && x.Id == inputModel.CompanyId);
            if (company==null)
            {
                throw new InvalidUserDataException(ErrorMessages.CompanyWithSuchIdDoesNotExist);
            }
            var article = new Article
            {
                Name = inputModel.Name,
                Description = inputModel.Description,
                VatRate = inputModel.VatRate,
                CompanyId=company.Id


            };


            await context.Articles.AddAsync(article);
            await context.SaveChangesAsync();

            return article.Id;

        }

        public async Task<ICollection<T>> GetAllArticlesByCompanyId<T>(string companyId)
        {
            var articles = await  context.Articles
                .Where(x => x.CompanyId == companyId)
                .To<T>()
                .ToListAsync();

            return articles;

        }

        public async Task<T> GetArticleById<T>(string articleId)
        {
            var article = await context.Articles
                     .Where(x => x.Id == articleId)
                     .To<T>()
                     .FirstOrDefaultAsync();

            return article;
        }
    }
}
