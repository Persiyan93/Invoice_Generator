using InvoiceGenerator.Common;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Services.Data;
using InvoiceGenerator.Web.Models;
using InvoiceGenerator.Web.Models.Articles;
using Microsoft.AspNetCore.Authorization;

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
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
      

        public ArticlesController(IArticleService articleService,UserManager<ApplicationUser> userManager,IMemoryCache cache)
        {
            this.articleService = articleService;
            this.userManager = userManager;
            this.cache = cache;
        }

        [HttpPost]
        public async Task<IActionResult> AddArticle(ArticleInputModel inputModel)
        {
            var user = await userManager.GetUserAsync(this.User);
            var companyId = user.CompanyId;
         var articleId = await articleService.AddArticle(inputModel,companyId,user.Id);

            return this.Ok(
                new ResponseViewModel
                {
                    Status = "Successful",
                    Message = string.Format(SuccessMessages.SuccessfullyAddedArticle, articleId)
                });
        }

        [HttpGet]
        public async Task<IActionResult> GetAllArticles()
        {
            var companyId = this.User.Claims.FirstOrDefault(x => x.Type == "companyId").Value;
            var articles = await articleService.GetAllArticlesByCompanyId<ArticleViewModel>(companyId);

            return this.Ok(articles);

        }

        [HttpGet("{articleId}")]
        public async Task<IActionResult> GetArticleInfo(string articleId)
        {
            var article =  await articleService.GetArticleById<ArticleViewModel>(articleId);

            return this.Ok(article);
        }

        [HttpPut("{articleId}")]
        public async Task<IActionResult> UpdateArticle(ArticleUpdateModel input,string articleId)
        {
            var user = await userManager.FindByNameAsync(this.User.Identity.Name);
            await articleService.UpdateArticle(input, articleId, user.Id);

            var response = new ResponseViewModel
               {
                    Status = "Successful",
                    Message = string.Format(SuccessMessages.SuccessfullyUpdateArticle, articleId)
                };
            return this.Ok(response);

        }


        [HttpPut]
        [Route("ArticleQuantity/{articleid}")]
        public async Task<IActionResult> UpdateArticleQuantity(UpdateArticleQuantityModel input, string articleId)
        {
         
            var user = await userManager.FindByNameAsync(this.User.Identity.Name);
            await articleService.UpdateArticleQuantity(articleId, input.Quantity, user.Id);
            var response = new ResponseViewModel
            {
                Status = "Successful",
                Message = string.Format(SuccessMessages.SuccessfullyUpdateArticleQuantity)
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
