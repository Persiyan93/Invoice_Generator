using System;
using System.Threading;
using System.Threading.Tasks;
using InvoiceGenerator.Common;
using InvoiceGenerator.Services.Data;
using InvoiceGenerator.Services.Messaging;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace InvoiceGenerator.Services.BackgroundServices
{
    public class GetUnPaidInvocesHostedService : IHostedService,IDisposable
    {
        private readonly IServiceScopeFactory scopeFactory;
        private Timer timer;

        public GetUnPaidInvocesHostedService(IServiceScopeFactory scopeFactory)
        {
            this.scopeFactory = scopeFactory;
        }

       

        public Task StartAsync(CancellationToken cancellationToken)
        {
            TimeSpan interval = TimeSpan.FromHours(24);
            
            var nextRunTime = DateTime.Today.AddDays(1).AddHours(2);
            var curTime = DateTime.Now;
            var firstInterval = nextRunTime.Subtract(curTime);

            Action action = () =>
            {
                var t1 = Task.Delay(firstInterval);
                t1.Wait();
               SendNotificationEmails(null);
           timer = new Timer(SendNotificationEmails, null, TimeSpan.Zero, interval);
            };
            Task.Run(action);
            return Task.CompletedTask;
        }

        public void SendNotificationEmails(object state)
        {
            _ = SendNotificationEmailsAsync();
        }

        private async Task SendNotificationEmailsAsync()
        {
            using (var scope = scopeFactory.CreateScope())
            {
                var emailService = scope.ServiceProvider.GetRequiredService<IEmailSender>();
                var invoiceService = scope.ServiceProvider.GetRequiredService<IInvoiceService>();
                await invoiceService.UpdateStatusofOverdueInvoicesAsync();
                var ovderdueInvoices = await invoiceService.GetAllUnPaidInvoicesWhoseClientsShouldbeNotifiedAsync();
              
                foreach (var invoice in ovderdueInvoices)
                {
                 
                    var emailSubject = string.Format(EmailMessages.InvoiceEmailSubject, invoice.InvoiceNumber);
                    var emailContent = string.Format(EmailMessages.EmailTemplate, invoice.InvoiceNumber, invoice.DateOfIssue, invoice.SellerName, invoice.InvoicePriceWithVat, "test");
                    await emailService.SendEmailAsync(invoice.ClientEmailAddress,emailSubject,emailContent);
                }
            }
        }
        public Task StopAsync(CancellationToken cancellationToken)
        {
            timer?.Change(Timeout.Infinite, 0);
            return Task.CompletedTask;
        }


        public void Dispose()
        {
            timer?.Dispose();
        }
    }
}
