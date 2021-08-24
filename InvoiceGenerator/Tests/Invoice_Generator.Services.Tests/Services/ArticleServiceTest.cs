using InvoiceGenerator.Common;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Services.Data;
using InvoiceGenerator.Web.Models.Articles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Invoice_Generator.Services.Tests.Services
{
    public class ArticleServiceTest : BaseServiceTest
    {
        private const string RegisteredCompanyId = "Test";
        private const string articleName = "Test article name";
        private const string articleId = "ArticleId";
        private const string userId = "TestUserId";


        [Fact]
        public async Task TryAddArticleToNotExistingCompany()
        {

            //Arrange

            var articleService = new ArticleService(this.DbContext);


            //Action
            Func<Task> act = () => articleService.AddArticle(new ArticleInputModel(), "test", "test");

            //Assert
            var exception = await Assert.ThrowsAsync<InvalidUserDataException>(act);
            var expectedError = string.Format(ErrorMessages.CompanyWithSuchIdDoesNotExist, "test");
            Assert.Equal(expectedError, exception.Message);

        }

        [Fact]
        public async Task AddArticleShouldReturnArticleIdAndCreateHistoryEvent()
        {

            //Arrange

            var articleService = new ArticleService(this.DbContext);
            await AddRegisteredCompanyToDb();


            //Action
            var input = new ArticleInputModel();
            await articleService.AddArticle(input, RegisteredCompanyId, "test");

            //Assert
            var expectedCountOfArticles = 1;
            var countOfArticlesFromDb = this.DbContext.Articles.Count();
            Assert.Equal(expectedCountOfArticles, countOfArticlesFromDb);
            var expectedCountOfHistoryEvents = 1;
            var countOfHistoryEventsFromDb = this.DbContext.ArticleHistoryEvents.Count();
            Assert.Equal(expectedCountOfHistoryEvents, countOfHistoryEventsFromDb);


        }
        [Fact]
        public async Task GetAllArticlesByCompanyIdSholudReturnOneArticle()
        {

            //Arrange

            var articleService = new ArticleService(this.DbContext);
            await AddRegisteredCompanyToDb();
            await this.DbContext.Articles.AddAsync(new Article { CompanyId = RegisteredCompanyId });
            await this.DbContext.Articles.AddAsync(new Article { CompanyId = "Random" });
            await this.DbContext.SaveChangesAsync();

            //Action

            var articles = await articleService.GetAllArticlesByCompanyId<ArticleViewModel>(RegisteredCompanyId);

            //Assert
            var expectedCountOfArticles = 1;
            Assert.Equal(expectedCountOfArticles, articles.Count);
        }



        [Fact]
        public async Task GetArticleByIdSholdReturnArticle()
        {

            //Arrange

            var articleService = new ArticleService(this.DbContext);
            await AddRegisteredCompanyToDb();
            var article = new Article { CompanyId = RegisteredCompanyId, Name = articleName };
            await this.DbContext.Articles.AddAsync(article);
            await this.DbContext.SaveChangesAsync();

            //Action
            var articleFromDb = await articleService.GetArticleById<ArticleViewModel>(article.Id);

            //Assert
            var expectedArticleName = articleName;
            Assert.NotNull(article);
            Assert.Equal(expectedArticleName, articleFromDb.Name);
        }

        [Fact]  
        public async Task TryUpdateNotExistArticle()
        {

            //Arrange
               var articleService = new ArticleService(this.DbContext);
            //Action
           
            var userId = "test";
            Func<Task> act = () => articleService.UpdateArticle(new ArticleUpdateModel(),articleId,userId);

            //Assert
            var exception = await Assert.ThrowsAsync<InvalidUserDataException>(act);
            var expectedError = string.Format(ErrorMessages.InvalidArticle, articleId);
            Assert.Equal(expectedError, exception.Message);
        }

        [Fact]
        public async Task UpdateArticleShouldEditArticleAndAddHistoryEvent()
        {

            //Arrange
            var articleService = new ArticleService(this.DbContext);
            await AddRegisteredCompanyToDb();
            var registeredCompany = this.DbContext.RegisteredCompanies.FirstOrDefault(x => x.Id == RegisteredCompanyId);
            var user = new ApplicationUser { CompanyId = RegisteredCompanyId };
            registeredCompany.Users.Add(user);
            var article = new Article { CompanyId = RegisteredCompanyId, Id=articleId,UnitPrice=100 };
            await this.DbContext.Articles.AddAsync(article);
            await this.DbContext.SaveChangesAsync();

            //Action
            var inputArticle = new ArticleUpdateModel { UnitPrice = 200 };
            await articleService.UpdateArticle(inputArticle, article.Id, user.Id);

            //Assert
            var updateArticle = this.DbContext.Articles.FirstOrDefault(x => x.Id == article.Id);
            Assert.NotNull(updateArticle);
            var expectedUnitPrice = 200;
            Assert.Equal(expectedUnitPrice, updateArticle.UnitPrice);
            var expectedCountOfHistoryEvents = 1;
            var countOfHistoryEvents = this.DbContext.ArticleHistoryEvents.Count();
            Assert.Equal(expectedCountOfHistoryEvents, countOfHistoryEvents);
        }


        [Fact]
        public async Task UpdateArticleQuanityShouldUpdateQuantityAndCreateHistoryEvent()
        {

            //Arrange
            var articleService = new ArticleService(this.DbContext);
            await AddRegisteredCompanyToDb();
            var registeredCompany = this.DbContext.RegisteredCompanies.FirstOrDefault(x => x.Id == RegisteredCompanyId);
            var user = new ApplicationUser { CompanyId = RegisteredCompanyId };
            registeredCompany.Users.Add(user);
            var article = new Article { CompanyId = RegisteredCompanyId, Id = articleId, UnitPrice = 100 };
            await this.DbContext.Articles.AddAsync(article);
            await this.DbContext.SaveChangesAsync();

            //Action
            var articleQuantity = 300;
            await articleService.UpdateArticleQuantity(article.Id, articleQuantity, user.Id);

            //Assert
            var updateArticle = this.DbContext.Articles.FirstOrDefault(x => x.Id == article.Id);
            Assert.NotNull(updateArticle);
            var expectedArticleQuantity = 300;
            Assert.Equal(expectedArticleQuantity, updateArticle.Quantity);
            var expectedCountOfHistoryEvent = 1;
            var countOfHistoryEvent = this.DbContext.ArticleHistoryEvents.Count();
            Assert.Equal(expectedCountOfHistoryEvent, countOfHistoryEvent);

        }

        private async Task AddRegisteredCompanyToDb()
        {
            await this.DbContext.RegisteredCompanies
                .AddAsync(new RegisteredCompany { Id = RegisteredCompanyId });
            await this.DbContext.SaveChangesAsync();
        }
    }
}
