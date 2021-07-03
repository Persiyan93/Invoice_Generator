using InvoiceGenerator.Data;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Services.Mapping;

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
                .FirstOrDefault(x => x.Id == inputModel.SellerId);
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
                Language = inputModel.Language,
                PaymentMethod=inputModel.PaymentMethod,
                AdditionalOptions=inputModel.AdditionalOptions

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

     

        public async Task<ICollection<T>> GetAllCompanyInvoices<T>(string userId)
        {
            var invoices = await context.Invoices
                .Where(x => x.Seller.Users.Any(u => u.Id == userId))
                .To<T>()
                .ToListAsync();

            return invoices;

        }

        public async  Task<T> GetInvoiceById<T>(string invoiceId)
        {
            var invoice = await context.Invoices
               .Where(x => x.Id == invoiceId)
               .To<T>()
               .FirstOrDefaultAsync();
               
            return invoice;
        }

        //public Task<InvoiceTemplateModel> GetInvoiceInformation(string invoiceId)
        //{
        //    var invoice = context.Invoices
        //        .Where(x => x.Id == invoiceId)
        //        .To<InvoiceTemplateModel>()
        //        .FirstOrDefault();


        //    return 


        //        //.Select(x => new InvoiceTemplateModel
        //        //{
        //        //    InvoiceNumber = x.InvoiceNumber.ToString(),
        //        //    ClientCompanyName = x.Client.Name,
        //        //    ClientCompanyType = x.Client.CompanyType.ToString(),
        //        //    ClientVatNumber = x.Client.VatNumber,
        //        //    ClientCountryName = x.Client.Address.Town.Country.Name,
        //        //    ClientTownName = x.Client.Address.Town.Country.Name,
        //        //    ClientAddressText = x.Client.Address.AddressText,
        //        //    ClientAccontablePersonName = x.Client.AccontablePersonName,
        //        //    ClientUniqueIdentificationNumbe = x.Client.UniqueIdentificationNumber,
        //        //    SellerVatNumber=x.Seller.VatNumber,
                   



        //        //});
        //}
    }
}
