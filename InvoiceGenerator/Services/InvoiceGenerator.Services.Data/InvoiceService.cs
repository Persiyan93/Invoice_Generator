using InvoiceGenerator.Common;
using InvoiceGenerator.Data;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Data.Models.Enum;
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
       

        public InvoiceService(ApplicationDbContext context )
        {
            this.context = context;
          
        }

        public async Task<string> AddInvoice(InvoiceInputModel inputModel,string companyId,string userId)
        {
            int invoiceShipingTime = 5;
            var invoice = new Invoice
            {
                SellerId = companyId,
                ClientId = inputModel.ClientId,
                DateOfTaxEvent = inputModel.DateOfTaxEvent,
                IssueDate = inputModel.IssueDate,
                Status = InvoiceStatus.WaitingForPayment,
                PaymentDueDate = DateTime.Now.Add(TimeSpan.FromDays(inputModel.PaymentTerm + invoiceShipingTime)),
                PaymentMethod = inputModel.PaymentMethod,
                CreatedByUserId = userId,
                PriceWithoutVat = inputModel.PriceWithoutVat ,
                VatValue = inputModel.VatValue 
            };
            await context.Invoices.AddAsync(invoice);
            foreach (var article in inputModel.Articles)
            {
                var articleFromStock = await context.Articles.FirstOrDefaultAsync(x => x.Id == article.Id);
                articleFromStock.Quantity -= article.Quantity;
                var articleToInvoice = new InvoiceToArticle
                {
                    ArticleId = article.Id,
                    Quantity = article.Quantity,
                    Discount = article.Discount,
                };
                invoice.Articles.Add(articleToInvoice);
            }

            await context.SaveChangesAsync();

            return invoice.Id;
        }
        public async Task UpdateInvoice(TempInvoiceModel inputModel, string invoiceId)
        {
            var invoice = await context.Invoices.FirstOrDefaultAsync(x => x.Id == invoiceId);
            if (invoice == null)
            {
                throw new InvalidUserDataException("Test");

            }

        }

        public async Task<string> CreateInvoice(InvoiceInputModel inputModel, string userId)
        {
            var company = context.RegisteredCompanies
                .Include(x => x.DefaultInvoiceOptions)
                .FirstOrDefault(x => x.Users.Any(u => u.Id == userId));
            if (company == null)
            {

            }
            var client = context.Clients
                .Include(x => x.ContactList)
                .FirstOrDefault(x => x.Id == inputModel.ClientId);

            if (client == null)
            {

            }

           

            var invoice = new Invoice
            {
                SellerId = company.Id,
                ClientId = company.Id,
                CreatedByUserId = userId,
                PaymentDueDate = DateTime.Now.AddDays((int)inputModel.PaymentTerm),
                DateOfTaxEvent = inputModel.DateOfTaxEvent,
                IssueDate = inputModel.IssueDate,
                Language = inputModel.Language,
                PaymentMethod = inputModel.PaymentMethod,


            };
            var contactPerson = client.ContactList.FirstOrDefault(x => x.Id == inputModel.ContactPersonId);
            if (contactPerson != null)
            {
                invoice.ContactPersonId = contactPerson.Id;
            }





            await context.Invoices.AddAsync(invoice);
            foreach (var inputArticle in inputModel.Articles)
            {
                var article = await context.Articles
                    .FirstOrDefaultAsync(x => x.Id == inputArticle.Id);
                invoice.Articles.Add(
                    new InvoiceToArticle
                    {
                        Article = article,



                    });
            }

            //invoice.PriceWithoutVat = invoice.Articles.Sum(x => x.PriceWithoutVat);
            //if (inputModel.AdditionalOptions==AdditionalInvoiceOptions.ZeroVatRate)
            //{
            //    invoice.VatValue = 0;
            //}
            //else
            //{
            //    invoice.VatValue = invoice.Articles.Sum(x => (decimal)x.Article.VatRate * x.PriceWithoutVat);
            //}


            //if (inputModel.DiscountPercentage!=null)
            //{
            //    invoice.DiscountPercentage = (double)inputModel.DiscountPercentage;
            //}

            await context.SaveChangesAsync();

            return invoice.Id;



        }



        public async Task<ICollection<T>> GetAllCompanyInvoices<T>(string companyId)
        {
            var invoices = await context.Invoices
                .Where(x => x.SellerId==companyId)
                .To<T>()
                .ToListAsync();

            return invoices;

        }

        public async Task<T> GetInvoiceById<T>(string invoiceId)
        {
            var invoice = await context.Invoices
               .Where(x => x.Id == invoiceId)
               .To<T>()
               .FirstOrDefaultAsync();

            return invoice;
        }

        public async Task<string> SaveInvoiceTemporary(TempInvoiceModel inputModel, string companyId, string userId)
        {
            int invoiceShipingTime = 5;
            var paymentTerm = inputModel.PaymentTerm == null ? 0 : (int)inputModel.PaymentTerm;
            var invoice = new Invoice
            {
                SellerId = companyId,
                ClientId = inputModel.ClientId,
                DateOfTaxEvent = inputModel.DateOfTaxEvent,
                IssueDate = inputModel.IssueDate,
                Status = InvoiceStatus.UnCompleted,
                PaymentDueDate=DateTime.Now.Add(TimeSpan.FromDays(paymentTerm+invoiceShipingTime)),
                PaymentMethod = inputModel.PaymentMethod,
                CreatedByUserId = userId,
                PriceWithoutVat=inputModel.PriceWithoutVat??0,
                VatValue=inputModel.VatValue??0
            };
            await context.Invoices.AddAsync(invoice);
            foreach (var article in inputModel.Articles)
            {
                var articleToInvoice = new InvoiceToArticle
                {
                    ArticleId = article.Id,
                    Quantity = article.Quantity,
                    Discount = article.Discount,
                };
                invoice.Articles.Add(articleToInvoice);
            }

            await context.SaveChangesAsync();

            return invoice.Id;
        }

        public Task GenerateInvoiceInPdfFormat(string invoiceId)
        {
            throw new NotImplementedException();
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
