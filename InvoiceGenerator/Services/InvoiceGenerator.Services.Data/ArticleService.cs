using InvoiceGenerator.Common;
using InvoiceGenerator.Data;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Data.Models.Enum;
using InvoiceGenerator.Services.Mapping;
using InvoiceGenerator.Web.Models.Articles;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using InvoiceGenerator.Web.Models;
using System.Threading.Tasks;
using InvoiceGenerator.Common.Resources;
using Microsoft.Extensions.Localization;

namespace InvoiceGenerator.Services.Data
{
    public class ArticleService : IArticleService
    {
        private readonly ApplicationDbContext context;
        private readonly IStringLocalizer<Messages> stringLocalizer;

        public ArticleService(ApplicationDbContext context,IStringLocalizer<Messages> stringLocalizer)
        {
            this.context = context;
            this.stringLocalizer = stringLocalizer;
        }
        public async Task<string> AddArticleAsync(ArticleInputModel inputModel, string companyId ,string userId)
        {
            var company = context.RegisteredCompanies
                .FirstOrDefault(x => x.IsActive == true && x.Id == companyId);
            if (company == null)
            {
                throw new InvalidUserDataException(stringLocalizer["RegisteredCompanyDoesNotExist",companyId]);
            }
            var article = new Article
            {
                Name = inputModel.Name,
                ArticleNumber=inputModel.ArticleNumber,
                UnitType = inputModel.UnitType,
                Quantity = inputModel.Quantity,
                UnitPrice = inputModel.UnitPrice,
                VatRate = inputModel.VatRate,
                CompanyId = companyId,
                Status=ProductStatus.Active,
                QuantityMonitoring=inputModel.QuantityMonitoring,
             };
            if (inputModel.QuantityMonitoring)
            {
                article.QuantityLowerLimit = inputModel.QuantityLowerLimit;
            }


            await context.Articles.AddAsync(article);

            var historyEvent = new ArticleHistoryEvent
            {
                
                EventType = HistoryEventType.AddNewArticle,
                ArticleId = article.Id,
                UserId = userId,
                BulgarianMessage=$"Артикул {article.Name} с артикулен номер :{article.ArticleNumber} беше създаден",
                AdditionalText=$"Article {article.Name} with article number  : {article.ArticleNumber} was created",
                CompanyId=companyId

            };
            await context.ArticleHistoryEvents.AddAsync(historyEvent);
            await context.SaveChangesAsync();

            return article.Name;

        }

        public async Task<ICollection<T>> GetAllArticlesByCompanyIdAsync<T>(string companyId)
        {
            var articles = await context.Articles
                .Where(x => x.CompanyId == companyId)
                .To<T>()
                .ToListAsync();

            return articles;

        }

        public async Task<T> GetArticleByIdAsync<T>(string articleId)
        {
            var article = await context.Articles
                     .Where(x => x.Id == articleId)
                     .To<T>()
                     .FirstOrDefaultAsync();

            return article;
        }

        public  async Task<ICollection<T>> GetTop10CompanyArticlesAsync<T>(string companyId)
        {
            var articles = await context.Articles
                .Where(x => x.CompanyId == companyId)
                .OrderByDescending(x => x.Invoices.Sum(a => a.Quantity))
                .Take(5)
                .To<T>()
                .ToListAsync();
            return articles;
        }

        public async  Task<string> UpdateArticleAsync(ArticleUpdateModel input, string articleId,string userId)
        {
            var article = await context.Articles.FirstOrDefaultAsync(x => x.Id == articleId&&x.Company.Users.Any(u=>u.Id==userId));
            if (article==null)
            {
                throw new InvalidUserDataException(string.Format(ErrorMessages.InvalidArticle, articleId));
            }

            article.UnitPrice = input.UnitPrice;
            article.Quantity = input.Quantity;
            article.Status = input.Status;
            article.VatRate = input.VatRate;
            article.QuantityMonitoring = input.QuantityMonitoring;
            if (input.QuantityMonitoring)
            {
               article.QuantityLowerLimit= input.QuantityLowerLimit;
            }

            var historyEvent = new ArticleHistoryEvent
            {
                
                EventType = HistoryEventType.EditArticle,
                ArticleId = article.Id,
                UserId = userId,
                BulgarianMessage = $"Артикул {article.Name} с артикулен номер :{article.ArticleNumber} беше редектиран",
                AdditionalText = $"Article {article.Name} with article number  : {article.ArticleNumber} was updated",
                CompanyId = article.CompanyId
            };

            await context.ArticleHistoryEvents.AddAsync(historyEvent);
            await context.SaveChangesAsync();

            return article.Name;



        }

        public async  Task<string> UpdateArticleQuantityAsync(string articleId, double newQuantity,string userId)
        {
           var article=await context.Articles.FirstOrDefaultAsync(x => x.Id == articleId );
            if (article==null)
            {
                throw new InvalidUserDataException(stringLocalizer["NonExistentArticle", articleId]);
            }

            article.Quantity += newQuantity;

            var articleHistoryEvent = new ArticleHistoryEvent
            {
                EventType = HistoryEventType.ArticleDelivery,
                ArticleId = article.Id,
                UserId = userId,
                AdditionalText = $"{newQuantity} were added to an item {article.Name}",
                BulgarianMessage=$"Бяха добавени {newQuantity} към артикул {article.Name}."


            };
            await context.ArticleHistoryEvents.AddAsync(articleHistoryEvent);
            await context.SaveChangesAsync();

            return article.Name;

            
        }
    }
}
