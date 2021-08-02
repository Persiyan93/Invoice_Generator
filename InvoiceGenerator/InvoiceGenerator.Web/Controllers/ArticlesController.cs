using InvoiceGenerator.Common;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Services.Data;
using InvoiceGenerator.Web.Models;
using InvoiceGenerator.Web.Models.Articles;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ArticlesController : ControllerBase
    {
        private readonly IArticleService articleService;
        private readonly UserManager<ApplicationUser> userManager;

        public ArticlesController(IArticleService articleService,UserManager<ApplicationUser> userManager)
        {
            this.articleService = articleService;
            this.userManager = userManager;
        }

        [HttpPost]
        public async Task<IActionResult> AddArticle(ArticleInputModel inputModel)
        {
            var user = await userManager.FindByNameAsync(this.User.Identity.Name);
            var companyId = user.CompanyId;
            if (companyId==null)
            {
                return this.BadRequest();
            }
            var articleId = await articleService.AddArticle(inputModel,companyId);

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
    }
}
