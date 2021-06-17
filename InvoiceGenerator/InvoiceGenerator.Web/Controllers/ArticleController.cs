using InvoiceGenerator.Common;
using InvoiceGenerator.Services.Data;
using InvoiceGenerator.Web.Models;
using InvoiceGenerator.Web.Models.Articles;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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
    public class ArticleController : ControllerBase
    {
        private readonly IArticleService articleService;

        public ArticleController(IArticleService articleService)
        {
            this.articleService = articleService;
        }

        [HttpPost]
        public async Task<IActionResult> AddArticle(ArticleInputModel inputModel)
        {
            var articleId = await articleService.AddArticle(inputModel);

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
            var companyId = this.User.Claims.FirstOrDefault(x => x.Type == "CompanyId").Value;
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
