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


        public InvoiceService(ApplicationDbContext context)
        {
            this.context = context;

        }

        public async Task<string> CreateInvoiceAsync(InvoiceInputModel inputModel, string companyId, string userId)
        {
            int invoiceShipingTime = 5;
            var client = await context.Clients.FirstOrDefaultAsync(x => x.Id == inputModel.ClientId && x.IsActive == true);
            IsClientValid(client);
            var lastInvoiceNumber = await context.Invoices
                .Where(x => x.SellerId == companyId)
                .OrderByDescending(x => x.InvoiceNumber)
                .Select(x => x.InvoiceNumber)
                .FirstOrDefaultAsync();
            if (lastInvoiceNumber == 0)
            {
                lastInvoiceNumber = 432;
            }


            var invoice = new Invoice
            {
                InvoiceNumber = lastInvoiceNumber + 1,
                SellerId = companyId,
                ClientId = inputModel.ClientId,
                DateOfTaxEvent = inputModel.DateOfTaxEvent,
                IssueDate = inputModel.IssueDate,
                Status = InvoiceStatus.WaitingForPayment,
                PaymentDueDate = DateTime.Now.Add(TimeSpan.FromDays(inputModel.PaymentPeriod + invoiceShipingTime)),
                PaymentMethod = inputModel.PaymentMethod,
                CreatedByUserId = userId,
                PaymentPeriod = inputModel.PaymentPeriod,
                Language = inputModel.InvoiceLanguage
            };
            if (invoice.PaymentMethod == MethodsOfPayment.BankTransfer)
            {
                var bankAccount = await context.BankAccounts.FirstOrDefaultAsync(x => x.Id == inputModel.BankAccountId && x.IsActive);
                if (bankAccount == null)
                {
                    throw new InvalidUserDataException(ErrorMessages.BankAccountDoesNotExist);
                }
                invoice.BankAccountId = bankAccount.Id;
            }

            await context.Invoices.AddAsync(invoice);
            double vateRateSum = 0;
            foreach (var article in inputModel.Articles)
            {
                var articleFromStock = await context.Articles.FirstOrDefaultAsync(x => x.Id == article.Id);
                ValidateArticle(articleFromStock);
                articleFromStock.Quantity -= article.Quantity;
                if (articleFromStock.Quantity < 0)
                {
                    throw new InvalidUserDataException(string.Format(ErrorMessages.NotEnoughAvailableQuantity, articleFromStock.ArticleNumber));
                }
                if (articleFromStock.QuantityMonitoring && articleFromStock.Quantity < articleFromStock.QuantityLowerLimit)
                {
                    var notification = new Notification
                    {
                        CompanyId = companyId,
                        Message = string.Format(NotificationMessages.ArticleQuantityUnderLimt, articleFromStock.Name, articleFromStock.ArticleNumber),
                        BulgarianMessage = string.Format(NotificationMessages.ArticleQuantityUnderLimtBG, articleFromStock.Name, articleFromStock.ArticleNumber),
                        Type = NotificationType.Warning

                    };
                    await context.Notifications.AddAsync(notification);

                }
                vateRateSum += articleFromStock.VatRate;

                var articleToInvoice = new InvoiceToArticle
                {
                    ArticleId = article.Id,
                    ArticlePrice = articleFromStock.UnitPrice,
                    Quantity = article.Quantity,
                    Discount = article.Discount,
                };

                invoice.Articles.Add(articleToInvoice);

            }
            foreach (var service in inputModel.Services)
            {
                var serviceFromStock = await context.Services.FirstOrDefaultAsync(x => x.Id == service.Id);
                if (serviceFromStock == null)
                {
                    throw new InvalidUserDataException(ErrorMessages.InvalidServiceId);
                }
                vateRateSum += serviceFromStock.VatRate;
                var serviceToInvocie = new InvoiceToService
                {
                    ServiceId = service.Id,
                    PriceWithoutVat = service.Price,
                    Quantity = service.Quantity,
                    AdditionalInfo = service.AdditionalInfo,
                };
                invoice.Services.Add(serviceToInvocie);

            }
            invoice.PriceWithoutVat = invoice.Articles.Sum(x => (x.ArticlePrice * (decimal)x.Quantity))
                                            + invoice.Services.Sum(x => (x.PriceWithoutVat * (decimal)x.Quantity));
            if (inputModel.IsInvoiceWithZeroVatRate)
            {
                invoice.VatValue = 0;
                invoice.IsInvoiceWithZeroVatRate = inputModel.IsInvoiceWithZeroVatRate;
                invoice.ReasonForInvoiceWithZeroVatRate = inputModel.ReasonForInvoiceWithZeroVatRate;
            }
            else
            {
                invoice.VatValue = (decimal)vateRateSum / (invoice.Articles.Count + invoice.Services.Count) * invoice.PriceWithoutVat / 100;
            }

            await context.SaveChangesAsync();
            var historyEvent = new InvoiceHistoryEvent
            {
                InvoiceId = invoice.Id,
                CompanyId = companyId,
                UserId = userId,
                EventType = HistoryEventType.CreateInvoice,
                AdditionalText = $"Invoice {invoice.InvoiceNumber} was created successfuly",
                BulgarianMessage = $"Фактура {invoice.InvoiceNumber} беше създадена"
            };
            await context.InvoiceHistoryEvents.AddAsync(historyEvent);
            await context.SaveChangesAsync();

            return invoice.Id;
        }
        public async Task EditInvoiceAsync(InvoiceInputModel inputModel, string userId, string invoiceId)
        {
            int invoiceShipingTime = 5;
            var invoice = await context.Invoices
                .Include(x => x.Articles)
                .Include(x => x.Services)
                .FirstOrDefaultAsync(x => x.Id == invoiceId);
            if (invoice == null)
            {
                throw new InvalidUserDataException(string.Format(ErrorMessages.InvoiceDoesNotExist, invoiceId));

            }
            if (invoice.Status == InvoiceStatus.Paid)
            {
                throw new InvalidUserDataException(ErrorMessages.AlreadyPaidInvoice);
            }

            var client = await context.Clients.FirstOrDefaultAsync(x => x.Id == inputModel.ClientId && x.IsActive == true);
            IsClientValid(client);
            invoice.ClientId = inputModel.ClientId;
            invoice.DateOfTaxEvent = inputModel.DateOfTaxEvent;
            invoice.IssueDate = inputModel.IssueDate;
            invoice.PaymentDueDate = inputModel.IssueDate.Add(TimeSpan.FromDays(inputModel.PaymentPeriod + invoiceShipingTime));
            invoice.PaymentMethod = inputModel.PaymentMethod;
            invoice.PaymentPeriod = inputModel.PaymentPeriod;
            invoice.Language = inputModel.InvoiceLanguage;
            if (invoice.PaymentMethod == MethodsOfPayment.BankTransfer)
            {
                var bankAccount = await context.BankAccounts.FirstOrDefaultAsync(x => x.Id == inputModel.BankAccountId && x.IsActive);
                if (bankAccount == null)
                {
                    throw new InvalidUserDataException(ErrorMessages.BankAccountDoesNotExist);
                }
                invoice.BankAccountId = bankAccount.Id;
            }


            var articlesWhichShouldRemove = invoice.Articles.Where(x => !inputModel.Articles.Any(i => i.Id == x.ArticleId)).ToList();
            foreach (var article in articlesWhichShouldRemove)
            {
                var articleFromStock = await context.Articles.FirstOrDefaultAsync(x => x.Id == article.ArticleId);
                articleFromStock.Quantity += article.Quantity;
                invoice.Articles.Remove(article);
            }
            double vatRateSum = 0;
            foreach (var article in inputModel.Articles)
            {
                var articleFromStock = await context.Articles.FirstOrDefaultAsync(x => x.Id == article.Id);
                ValidateArticle(articleFromStock);
                vatRateSum += articleFromStock.VatRate;
                var existArticle = invoice.Articles.FirstOrDefault(x => x.ArticleId == article.Id);
                if (existArticle != null)
                {
                    articleFromStock.Quantity += existArticle.Quantity - article.Quantity;
                    existArticle.Quantity = article.Quantity;
                    existArticle.Discount = article.Discount;
                }
                else
                {
                    articleFromStock.Quantity -= article.Quantity;
                    var articleToInvoice = new InvoiceToArticle
                    {
                        ArticleId = article.Id,
                        Quantity = article.Quantity,
                        Discount = article.Discount,
                        ArticlePrice = articleFromStock.UnitPrice,

                    };
                    invoice.Articles.Add(articleToInvoice);
                }
                if (articleFromStock.Quantity < 0)
                {
                    throw new InvalidUserDataException(string.Format(ErrorMessages.NotEnoughAvailableQuantity, articleFromStock.ArticleNumber));
                }
                if (articleFromStock.QuantityMonitoring && articleFromStock.Quantity < articleFromStock.QuantityLowerLimit)
                {
                    var notification = new Notification
                    {
                        CompanyId = invoice.SellerId,
                        Message = string.Format(NotificationMessages.ArticleQuantityUnderLimt, articleFromStock.Name, articleFromStock.ArticleNumber),
                        Type = NotificationType.Warning

                    };
                    await context.Notifications.AddAsync(notification);

                }
            }
            var serviceWhichWillBeDeleted = invoice.Services.Where(x => !inputModel.Services.Any(y => y.Id == x.ServiceId));
            foreach (var service in serviceWhichWillBeDeleted)
            {
                invoice.Services.Remove(service);
            }
            foreach (var service in inputModel.Services)
            {
                var serviceFromStock = await context.Services.FirstOrDefaultAsync(x => x.Id == service.Id);
                if (serviceFromStock == null)
                {
                    throw new InvalidUserDataException(string.Format(ErrorMessages.InvalidServiceId, service.Id));
                }
                vatRateSum += serviceFromStock.VatRate;
                var existService = invoice.Services.FirstOrDefault(x => x.ServiceId == service.Id);
                if (existService != null)
                {
                    existService.Quantity = service.Quantity;
                    existService.PriceWithoutVat = service.Price;
                    existService.AdditionalInfo = service.AdditionalInfo;

                }
                else
                {
                    existService = new InvoiceToService
                    {
                        InvoiceId = invoice.Id,
                        ServiceId = service.Id,
                        Quantity = service.Quantity,
                        PriceWithoutVat = service.Price,
                        AdditionalInfo = service.AdditionalInfo,

                    };
                    invoice.Services.Add(existService);

                }


            }

            invoice.PriceWithoutVat = invoice.Articles.Sum(x => (x.ArticlePrice * (decimal)x.Quantity))
                                          + invoice.Services.Sum(x => (x.PriceWithoutVat * (decimal)x.Quantity));
            if (inputModel.IsInvoiceWithZeroVatRate)
            {
                invoice.VatValue = 0;
                invoice.IsInvoiceWithZeroVatRate = inputModel.IsInvoiceWithZeroVatRate;
                invoice.ReasonForInvoiceWithZeroVatRate = inputModel.ReasonForInvoiceWithZeroVatRate;
            }
            else
            {
                invoice.IsInvoiceWithZeroVatRate = false;
                invoice.ReasonForInvoiceWithZeroVatRate = "";
                invoice.VatValue = (decimal)vatRateSum / (invoice.Articles.Count + invoice.Services.Count) * invoice.PriceWithoutVat / 100;
            }


            var historyEvent = new InvoiceHistoryEvent
            {
                EventType = HistoryEventType.EditInvoice,
                CompanyId = invoice.SellerId,
                UserId = userId,
                InvoiceId = invoice.Id,
                AdditionalText = $"Invoice with InvoiceNumber:{invoice.InvoiceNumber}",
                BulgarianMessage = $"Фактура {invoice.InvoiceNumber} беше редактирана"
            };

            await context.InvoiceHistoryEvents.AddAsync(historyEvent);

            await context.SaveChangesAsync();


        }
        public async Task<int> UpdateStatusOfInvoicesAsync(UpdateInvoiceStatusInputModel inputModel, string companyId, string userId)
        {
            int invoiceNumber = 0;
            if (inputModel.Status == InvoiceStatus.Locked && inputModel.InvoiceIds.Count > 1)
            {
                throw new InvalidUserDataException(ErrorMessages.LockMoreThanOneInvoices);
            }
            foreach (var invoiceid in inputModel.InvoiceIds)
            {
                var invoice = await context.Invoices.FirstOrDefaultAsync(x => x.Id == invoiceid);
                if (invoice.SellerId != companyId)
                {
                    throw new InvalidUserDataException(ErrorMessages.ForeignInvoice);
                }
                invoice.Status = inputModel.Status;
                if (inputModel.Status == InvoiceStatus.Paid)
                {
                    var notification = new Notification
                    {
                        CompanyId = companyId,
                        BulgarianMessage = $"Фактура с номер {invoice.InvoiceNumber} беше платена",
                        Type = NotificationType.Info,
                        Message = $"Invoice with number {invoice.InvoiceNumber} was paid"
                    };
                    await context.Notifications.AddAsync(notification);
                    var invoiceEvent = new InvoiceHistoryEvent
                    {
                        InvoiceId = invoice.Id,
                        CompanyId = companyId,
                        UserId = userId,
                        EventType = HistoryEventType.MarkInvoiceAsPaid,
                        BulgarianMessage = $"Фактура с номер {invoice.InvoiceNumber} беше маркирана като платена",
                        AdditionalText = $"Invocie with number {invoice.InvoiceNumber} was marked as paid"

                    };
                    await context.InvoiceHistoryEvents.AddAsync(invoiceEvent);

                }
                invoiceNumber = invoice.InvoiceNumber;
            }

            await context.SaveChangesAsync();

            return invoiceNumber;

        }

        public async Task UpdateStatusofOverdueInvoicesAsync()
        {
            var invoices = await context.Invoices
                .Where(i => i.Status == InvoiceStatus.WaitingForPayment && DateTime.Compare(i.PaymentDueDate, DateTime.Now.AddDays(1)) < 0)
                .ToListAsync();

            foreach (var invoice in invoices)
            {
                invoice.Status = InvoiceStatus.Overdue;
                var companySettings = await context.CompanySettings.FirstOrDefaultAsync(x => x.CompanyId == invoice.SellerId);
                if (companySettings.BlockClientWhenReachMaxCountOfUnpaidInvoices)
                {
                    var client = await context.Clients
                        .Where(x => x.Id == invoice.ClientId
                                    && x.Invoices.Where(i => i.Status == InvoiceStatus.Overdue).Count() >= companySettings.MaxCountOfUnPaidInvoices
                                    && x.Status == ClientStatus.Active).FirstOrDefaultAsync();
                    if (client != null)
                    {
                        client.Status = ClientStatus.Blocked;
                    }

                }
                var notificationMessage = string.Format(NotificationMessages.InvoiceisOverdue, invoice.InvoiceNumber);
                var notification = new Notification
                {
                    CompanyId = invoice.SellerId,
                    Message = $"Invoice {invoice.InvoiceNumber} is overdue",
                    BulgarianMessage = $"Фактура с номер {invoice.InvoiceNumber} и стойност {invoice.PriceWithoutVat + invoice.VatValue}  е просрочена",
                    Type = NotificationType.Warning
                };
                await context.Notifications.AddAsync(notification);

            }

            await context.SaveChangesAsync();

        }
        public async Task<ICollection<InvoiceEmailModel>> GetAllUnPaidInvoicesWhoseClientsShouldbeNotifiedAsync()
        {
            var invoices = await context.Invoices
                .Where(i => i.Status == InvoiceStatus.Overdue &&
                          i.Seller.DefaultInvoiceOptions.SendAutomaticGeneratedEmails == true &&
                          i.Notifications.Any(n => n.Type == NotificationType.SendAutomaticGeneratedEmail
                                   && DateTime.Compare(n.Date.AddDays(i.Seller.DefaultInvoiceOptions.PeriodInDaysBetweenTwoRepatedEmails), DateTime.Now) < 0))
                .Select(i => new InvoiceEmailModel
                {
                    Id = i.Id,
                    ClientName = i.Client.Name,
                    ClientEmailAddress = i.Client.EmailAddressOfCompany,
                    DateOfIssue = i.IssueDate,
                    InvoicePriceWithVat = i.PriceWithoutVat + i.VatValue,
                    PaymentDueDate = i.PaymentDueDate,
                    InvoiceNumber = i.InvoiceNumber,
                    SellerName = i.Seller.Name,
                    SellerId = i.SellerId,

                })
                .ToListAsync();

            foreach (var invoice in invoices)
            {
                var notification = new Notification();
                notification.CompanyId = invoice.SellerId;
                if (invoice.ClientEmailAddress != null)
                {

                    notification.BulgarianMessage = $"Фирма {invoice.ClientName}  беше информирана за неплатена "
                    + $"факутура с номер {invoice.InvoiceNumber} издадена на {invoice.DateOfIssue} ";
                    notification.Message = $"Client {invoice.ClientName}  was notified about unpaid "
                 + $"invoice with number {invoice.InvoiceNumber} issued on {invoice.DateOfIssue} ";
                    notification.Type = NotificationType.SendAutomaticGeneratedEmail;

                }
                else
                {
                    invoices.Remove(invoice);
                    notification.BulgarianMessage = "Неуспшно информиране на клиента поради липса на имейл адрес.Моля добавете имеил адрес";
                    notification.Message = "";
                    notification.Type = NotificationType.Error;

                }

                await context.Notifications.AddAsync(notification);
            }
            await context.SaveChangesAsync();

            return invoices;




        }






        public async Task<ICollection<T>> GetAllCompanyInvoicesAsync<T>(string companyId, DateTime startDate, DateTime endDate,
                                                                    string orderBy, string order, int invoiceNumber, string clientName, string createdBy, string invoiceStatus)
        {

            var ordebyDesc = order == "desc";
            var invoiceQuery = context.Invoices.Where(x => x.SellerId == companyId)
                    .Where(x => DateTime.Compare(x.IssueDate, startDate) >= 0
                              && DateTime.Compare(x.IssueDate, endDate) <= 0);
            if (invoiceNumber != 0)
            {
                invoiceQuery = invoiceQuery.Where(x => x.InvoiceNumber == invoiceNumber);

            }

            if (!string.IsNullOrEmpty(createdBy))
            {
                invoiceQuery = invoiceQuery.Where(x => x.CreatedByUserId == createdBy);
            }

            if (!string.IsNullOrEmpty(invoiceStatus))
            {
                var isSuccess = Enum.TryParse((typeof(InvoiceStatus)), invoiceStatus, out object invoiceStatusEnum);

                if (isSuccess)
                {
                    invoiceQuery = invoiceQuery.Where(x => (int)x.Status == (int)invoiceStatusEnum);
                }
            }


            var invoices = await invoiceQuery
                .To<T>()
                .PropertyContainsText("ClientName", clientName)
                .CustomOrderBy(orderBy, ordebyDesc)
                .ToListAsync();



            return invoices;

        }

        public async Task<T> GetInvoiceByIdAsync<T>(string invoiceId)
        {
            var invoice = await context.Invoices
               .Where(x => x.Id == invoiceId)
               .To<T>()
               .FirstOrDefaultAsync();

            return invoice;
        }

        public async Task<ICollection<T>> GetClientInvoicesByClientIdAsync<T>(string clientId, DateTime startDate, DateTime endDate, string orderBy, string order)
        {
            var ordebyDesc = order == "desc";
            var invoices = await context.Invoices.Where(x => x.ClientId == clientId)
                 .Where(x => DateTime.Compare(x.IssueDate, startDate) >= 0
                              && DateTime.Compare(x.IssueDate, endDate) <= 0)
                   .To<T>()
                .CustomOrderBy(orderBy, ordebyDesc)
                .ToListAsync();



            return invoices;
        }

        public async Task<ICollection<InvoiceIncomesByMonthsViewModel>> GetSalesByMonthsAsync(string companyId)
        {
            var salеsByMonths = await context.Invoices
                .Where(i => i.SellerId == companyId)
                .Select(i => new
                {
                    Month = i.IssueDate.Month,
                    Year = i.IssueDate.Year,
                    InvoicePrice = i.PriceWithoutVat + i.VatValue


                })
                .ToListAsync();



            var now = DateTime.UtcNow.AddDays(1 - DateTime.UtcNow.Day);
            var months = Enumerable.Range(-11, 12)
                .Select(m => new DateTime(now.AddMonths(m).Year, now.AddMonths(m).Month, 1));

            var salesForLastYear = months.GroupJoin(salеsByMonths
                                                    , m => new { Month = m.Month, Year = m.Year }
                                                    , invoice => new { Month = invoice.Month, Year = invoice.Year }
                                                    , (p, g) => new InvoiceIncomesByMonthsViewModel
                                                    {
                                                        Month = p.Month,
                                                        Year = p.Year,
                                                        InvoicesCount = g.Count(),
                                                        Incomes = g.Sum(i => i.InvoicePrice)
                                                    })
                .ToList();

            return salesForLastYear;

        }

        public async Task<DefaultInvoiceOptions> GetDefaultInvoiceOptionsAsync(string companyId)
        {
            var invoiceOptions = await context.CompanySettings
                .Where(x => x.CompanyId == companyId)
                .To<DefaultInvoiceOptions>()
                .FirstOrDefaultAsync();

            return invoiceOptions;
        }


        private void IsClientValid(Client client)
        {
            if (client == null)
            {
                throw new InvalidUserDataException(string.Format(ErrorMessages.ClientDoesNotExist));
            }
            if (client.Status == ClientStatus.Blocked)
            {
                throw new InvalidUserDataException(string.Format(ErrorMessages.BlockedClient, client.Name));
            }
        }

        private void ValidateArticle(Article article)
        {
            if (article == null)
            {
                throw new InvalidUserDataException(string.Format(ErrorMessages.InvalidArticle, article.Id));
            }
            if (article.Status == ProductStatus.Blocked)
            {

                throw new InvalidUserDataException(string.Format(ErrorMessages.BlockedArticle, article.Id));
            }

        }


    }


}
