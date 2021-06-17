using InvoiceGenerator.Data;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Web.Models.Invoices;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvoiceGenerator.Services.Data
{
    public class InvoiceService : IInvoiceService

    {
        private readonly ApplicationDbContext context;

        public InvoiceService(ApplicationDbContext context)
        {
            this.context = context;
        }
        public async Task<string> CreateInvoice(InvoiceInputModel inputModel, string userId)
        {
            var company = context.RegisteredCompanies
                .Include(x => x.DefaultInvoiceOptions)
                .FirstOrDefault(x => x.Id == inputModel.CompanyId);
            if (company == null)
            {

            }
            var client = context.Clients
                .Include(x => x.ContactList)
                .FirstOrDefault(x => x.Id == inputModel.ClientId);

            if (client == null)
            {

            }
            var contactPerson = client.ContactList.FirstOrDefault(x => x.Id == inputModel.ClientId);

            contactPerson ??= client.ContactList.FirstOrDefault();

            inputModel.PaymentTerm ??= company.DefaultInvoiceOptions.DefaultPaymentTerm;



            var invoice = new Invoice
            {
                SellerId = company.Id,
                ClientId = company.Id,
                ContactPersonId = contactPerson.Id,
                CreatedByUserId = userId,
                PaymentDueDate = DateTime.Now.AddDays(inputModel.PaymentTerm.Value.TotalDays),
                IssueDate = inputModel.IssueDate,
                DiscountPercentage = inputModel.DiscountPercentage,
                Language = inputModel.Language
            };

            await context.Invoices.AddAsync(invoice);
            foreach (var article in inputModel.Articles)
            {
                invoice.Articles.Add(
                    new InvoiceToArticle
                    {
                        ArticleId=article.Id,
                        PriceWithoutVat=article.Price

                    });
            }

            invoice.PriceWithoutVat = invoice.Articles.Sum(x => x.PriceWithoutVat);
            invoice.VatValue = invoice.Articles.Sum(x => (decimal)x.Article.VatRate * x.PriceWithoutVat);

            await context.SaveChangesAsync();

            return invoice.Id;



        }

        public Task<ICollection<T>> GetAllCompanyInvoices<T>(string companyId)
        {
            throw new NotImplementedException();
        }

        public Task<T> GetInvoiceById<T>(string invoiceId)
        {
            throw new NotImplementedException();
        }
    }
}
