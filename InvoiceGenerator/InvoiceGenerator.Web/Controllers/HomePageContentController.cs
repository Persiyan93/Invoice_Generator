using InvoiceGenerator.Common;
using InvoiceGenerator.Common.Resources;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Services.Data;
using InvoiceGenerator.Web.Models;
using InvoiceGenerator.Web.Models.HomeContent;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Localization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class HomePageContentController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IHomePageContentService homePageContentService;
        private readonly IMemoryCache cache;
        private readonly IStringLocalizer<Messages> stringLocalizer;
        private const string cacheKey = "UserHomePageContent";

        public HomePageContentController(UserManager<ApplicationUser> userManager,
                                            IHomePageContentService homePageContentService,
                                            IMemoryCache cache,
                                            IStringLocalizer<Messages> stringLocalizer)
        {
            this.userManager = userManager;
            this.homePageContentService = homePageContentService;
            this.cache = cache;
            this.stringLocalizer = stringLocalizer;
        }

        [HttpGet]
        [Route("UserHomePageContent")]
        public async Task<IActionResult> GetHomeContetOfUser()
        {
            ICollection<HomePageContentModel> homePageContent;
            var user = await userManager.GetUserAsync(this.User);

            if (!this.cache.TryGetValue((cacheKey + user.Id), out homePageContent))
            {
                homePageContent = await homePageContentService.GetUserHomePageContentAsync<HomePageContentModel>(user.Id);
                this.cache.Set((cacheKey + user.Id), homePageContent, TimeSpan.FromHours(24));
            }


            return this.Ok(homePageContent);
        }

        [HttpPost("{homePageContentId}")]
        public async Task<IActionResult> AddNewContentToUserHomePage(int homePageContentId)
        {
            var user = await userManager.GetUserAsync(HttpContext.User);
            await homePageContentService.AddNewContentToHomePageAsync(user.Id, homePageContentId);

            ICollection<HomePageContentModel> homePageContent;
            homePageContent = await homePageContentService.GetUserHomePageContentAsync<HomePageContentModel>(user.Id);
            this.cache.Set((cacheKey + user.Id), homePageContent, TimeSpan.FromHours(24));


            return this.Ok(new ResponseViewModel
            {
                Status = SuccessMessages.SuccessfullyStatus,
                Message = stringLocalizer["SuccessfullyAddedContent"]
            }) ;
        }

        [HttpGet]
        public async Task<IActionResult> GetHomePageContentTypesWhichUserDoesNotUse()
        {
            var user = await userManager.GetUserAsync(this.User);

            var homePageContents = await homePageContentService.GetAllHomePageContetsWhichUserDoesNotUseAsync<HomePageContentModel>(user.Id);

            return this.Ok(homePageContents);
        }

        [HttpDelete("{contentId}")]
        public async Task<IActionResult> RemoveContentFromUserHomePage(int contentId)
        {
            var user = await userManager.GetUserAsync(this.User);

            await homePageContentService.RemoveSelectedContentFromHomePageAsync(contentId, user.Id);

            ICollection<HomePageContentModel> homePageContent;
            homePageContent = await homePageContentService.GetUserHomePageContentAsync<HomePageContentModel>(user.Id);
            this.cache.Set((cacheKey + user.Id), homePageContent, TimeSpan.FromHours(24));

            return this.Ok(new ResponseViewModel
            {
                Status = SuccessMessages.SuccessfullyStatus,
               
            });

        }
    }
}
