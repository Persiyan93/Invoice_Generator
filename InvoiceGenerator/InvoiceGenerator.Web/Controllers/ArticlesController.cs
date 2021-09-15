using InvoiceGenerator.Common;
using InvoiceGenerator.Common.Resources;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Services.Data;
using InvoiceGenerator.Web.Models;
using InvoiceGenerator.Web.Models.Articles;
using Microsoft.AspNetCore.Authorization;

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
    [Authorize(Roles = "AdministratorOfCompany,ProductsAccessRole")]
    public class ArticlesController : ControllerBase
    {
        private readonly IArticleService articleService;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IMemoryCache cache;
        private readonly IStringLocalizer<Messages> stringLocalizer;

        public ArticlesController
            (
                 IArticleService articleService,
                 UserManager<ApplicationUser> userManager,
                 IMemoryCache cache,
                IStringLocalizer<Messages> stringLocalizer
            )
        {
            this.articleService = articleService;
            this.userManager = userManager;
            this.cache = cache;
            this.stringLocalizer = stringLocalizer;
        }

        [HttpPost]
        public async Task<IActionResult> AddArticle(ArticleInputModel inputModel)
        {
            var user = await userManager.GetUserAsync(this.User);
            var companyId = user.CompanyId;
            var articleName = await articleService.AddArticleAsync(inputModel, companyId, user.Id);

            return this.Ok(
                new ResponseViewModel
                {
                    Status = "Successful",
                    Message = stringLocalizer["SuccessfullyAddedArticle", articleName]
                });
        }


        [HttpGet]
        public async Task<IActionResult> GetAllArticles()
        {
            var companyId = this.User.Claims.FirstOrDefault(x => x.Type == "companyId").Value;
            var articles = await articleService.GetAllArticlesByCompanyIdAsync<ArticleViewModel>(companyId);

            return this.Ok(articles);

        }

        [HttpGet("{articleId}")]
        public async Task<IActionResult> GetArticleInfo(string articleId)
        {
            var article = await articleService.GetArticleByIdAsync<ArticleViewModel>(articleId);

            return this.Ok(article);
        }

        [HttpPut("{articleId}")]
        public async Task<IActionResult> UpdateArticle(ArticleUpdateModel input, string articleId)
        {
            var user = await userManager.FindByNameAsync(this.User.Identity.Name);
            var articleName=await articleService.UpdateArticleAsync(input, articleId, user.Id);

            var response = new ResponseViewModel
            {
                Status = "Successful",
                Message = stringLocalizer["SuccessfullyUpdatedArticleStatus",articleName]
            };
            return this.Ok(response);

        }


        [HttpPut]
        [Route("ArticleQuantity/{articleid}")]
        public async Task<IActionResult> UpdateArticleQuantity(UpdateArticleQuantityModel input, string articleId)
        {

            var user = await userManager.FindByNameAsync(this.User.Identity.Name);
           var articleName= await articleService.UpdateArticleQuantityAsync(articleId, input.Quantity, user.Id);
            var response = new ResponseViewModel
            {
                Status = "Successful",
                Message = stringLocalizer["SuccessfullyAddedArticleQuantity",input.Quantity,articleName]
            };
            return this.Ok(response);

        }


        [HttpGet]
        [Route("TopTenArticles")]
        public async Task<IActionResult> GetTopArticles()
        {
            ICollection<ArticleViewModelInTop10ArticlesList> articles;

            var companyId = this.User.Claims.FirstOrDefault(x => x.Type == "companyId").Value;
            var cacheKey = "Top10Articles" + companyId;

            if (!this.cache.TryGetValue(cacheKey, out articles))
            {
                articles = await articleService.GetTop10CompanyArticlesAsync<ArticleViewModelInTop10ArticlesList>(companyId);
                this.cache.Set(cacheKey, articles, TimeSpan.FromHours(24));
            }




            return this.Ok(articles);

        }


    }
}
