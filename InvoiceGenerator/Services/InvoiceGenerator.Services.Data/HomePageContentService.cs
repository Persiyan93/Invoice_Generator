using InvoiceGenerator.Common;
using InvoiceGenerator.Data;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Services.Mapping;
using InvoiceGenerator.Web.Models.HomeContent;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Services.Data
{
    public class HomePageContentService : IHomePageContentService
    {
        private readonly ApplicationDbContext context;

        public HomePageContentService(ApplicationDbContext context)
        {
            this.context = context;
        }
        public  async Task AddNewContentToHomePageAsync(string userId, int homePageContentId)
        {
            var homePageContent = await context.HomePageContents
                .FirstOrDefaultAsync(x => x.Id == homePageContentId);
            if (homePageContent==null)
            {
               
                throw new InvalidUserDataException(string.Format(ErrorMessages.InvalidHomePageContent, homePageContentId));
            }
            var isUserHasContentToHisHomePage = await context.HomePageContents
                .Select(x => x.HomePageContentToUsers.Any(u => u.Id == userId))
                .FirstOrDefaultAsync();
            if (isUserHasContentToHisHomePage)
            {
                throw new InvalidUserDataException("You can not add content 2 times ");
            }

            var homePageToUser = new HomePageContentToUser
            {
                UserId = userId
            };
     
         
            homePageContent.HomePageContentToUsers.Add(homePageToUser);

            await context.SaveChangesAsync();

        }

        public async Task<ICollection<T>> GetUserHomePageContentAsync<T>(string userId)
        {
            var homePageContents = await context.HomePageContents
                 .Where(x => x.HomePageContentToUsers.Any(x => x.UserId == userId))
                 .To<T>()
                 .ToListAsync();

            return homePageContents;
        }

      

        public async Task<ICollection<T>> GetAllHomePageContetsWhichUserDoesNotUseAsync<T>(string userId)
        {
            var allContentTypes =  await context.HomePageContents
                    .Where(x=>x.HomePageContentToUsers.All(cu=>cu.UserId!=userId))
                  .To<T>()
                  .ToListAsync();

            return allContentTypes;
        }

        public async  Task RemoveSelectedContentFromHomePageAsync(int contentId, string userId)
        {
           var homePageContent = await context.HomePageContents
                .Include(x=>x.HomePageContentToUsers)
                .FirstOrDefaultAsync(x=>x.Id==contentId);
            if (homePageContent==null)
            {
                throw new InvalidUserDataException(string.Format(ErrorMessages.InvalidHomePageContent, contentId));
            }
            homePageContent.HomePageContentToUsers.Remove(homePageContent.HomePageContentToUsers.Where(x=>x.UserId==userId).FirstOrDefault());
            await context.SaveChangesAsync();
        }
    }
}
