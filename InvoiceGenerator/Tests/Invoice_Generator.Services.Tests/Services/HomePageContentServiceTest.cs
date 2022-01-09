using InvoiceGenerator.Common;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Services.Data;
using InvoiceGenerator.Web.Models.HomeContent;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Invoice_Generator.Services.Tests.Services
{
   public  class HomePageContentServiceTest:BaseServiceTest
    {

        [Fact]
        public async Task TryAddNewContentWhichDoesnotExistToHomePageAsyncThrowException()
        {

            //Arrange
            var homePageContentService = new HomePageContentService(this.DbContext);


            //Action
            var userId = "Test";
            var contentId = 1;
            Func<Task> act = () => homePageContentService.AddNewContentToHomePageAsync(userId, contentId);

            //Assert
            var exception = await Assert.ThrowsAsync<InvalidUserDataException>(act);
            var expectedError = string.Format(ErrorMessages.InvalidHomePageContent, contentId);
            Assert.Equal(expectedError, exception.Message);

        }

        [Fact]
        public async Task AddNewContentToHomePageAsyncShouldAddContentToUser()
        {

            //Arrange
            var homePageContentService = new HomePageContentService(this.DbContext);
            var homePageContent = new HomePageContent();
            await this.DbContext.HomePageContents.AddAsync(homePageContent);
            await this.DbContext.SaveChangesAsync();


            //Action
            var userId = "Test";
            await homePageContentService.AddNewContentToHomePageAsync(userId, homePageContent.Id);

            //Assert
            var contentToUser = this.DbContext.HomePageContents.Select(x => x.HomePageContentToUsers.Count()).FirstOrDefault();
            var expectedCount = 1;
            Assert.Equal(expectedCount, contentToUser);

        }

       [Fact]
        public async Task GetUserHomePageContentAsyncShouldReturnHomePageContent()
        {

            //Arrange
            var homePageContentService = new HomePageContentService(this.DbContext);
            var homePageContent = new HomePageContent();
            await this.DbContext.HomePageContents.AddAsync(homePageContent);
            await this.DbContext.SaveChangesAsync();
            var userId = "Test";
            await homePageContentService.AddNewContentToHomePageAsync(userId, homePageContent.Id);


            //Action
            var contents =await  homePageContentService.GetUserHomePageContentAsync<HomePageContentModel>(userId);

            //Assert
            Assert.NotEqual(0, contents.Count);

        }

       
        [Fact]
        public async Task GetAllHomePageContetsWhichUserDoesNotUseAsyncShouldReturnOneContent()
        {

            //Arrange
            var userId = "Test";
            var homePageContentService = new HomePageContentService(this.DbContext);
            var homePageContent = new HomePageContent();
            var secondHomePageContent = new HomePageContent();
            await this.DbContext.HomePageContents.AddAsync(homePageContent);
            await this.DbContext.HomePageContents.AddAsync(secondHomePageContent);
            await this.DbContext.SaveChangesAsync();
             await homePageContentService.AddNewContentToHomePageAsync(userId, homePageContent.Id);


            //Action
            var contentsWhicUserDoesNotUse = await homePageContentService.GetAllHomePageContetsWhichUserDoesNotUseAsync<HomePageContentModel>(userId);

            //Assert
            Assert.NotEqual(0, contentsWhicUserDoesNotUse.Count);

        }

        [Fact]
        public async Task RemoveSelectedContentFromHomePageAsyncShouldRemoveContentFromUserHomePage()
        {

            //Arrange
            var userId = "Test";
            var homePageContentService = new HomePageContentService(this.DbContext);
            var homePageContent = new HomePageContent();
            await this.DbContext.HomePageContents.AddAsync(homePageContent);
            await this.DbContext.SaveChangesAsync();
            await homePageContentService.AddNewContentToHomePageAsync(userId, homePageContent.Id);


            //Action
            await homePageContentService.RemoveSelectedContentFromHomePageAsync(homePageContent.Id, userId);


            //Assert
            var contentToUser = this.DbContext.HomePageContents.Select(x => x.HomePageContentToUsers.Count()).FirstOrDefault();
            var expectedCount = 0;
            Assert.Equal(expectedCount, contentToUser);

        }

        [Fact]
        public async Task TryRemoveHomePageContentWhichDoesNotExistThrowException()
        {

            //Arrange
          
            var homePageContentService = new HomePageContentService(this.DbContext);
     
            //Action
            Func<Task> act = () => homePageContentService.RemoveSelectedContentFromHomePageAsync(1, "test");

            //Assert
            var exception = await Assert.ThrowsAsync<InvalidUserDataException>(act);
            var expectedError = string.Format(ErrorMessages.InvalidHomePageContent, "test");
            Assert.Equal(expectedError, exception.Message);

        }
    }
}
