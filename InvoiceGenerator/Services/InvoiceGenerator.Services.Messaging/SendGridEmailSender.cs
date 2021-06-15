using SendGrid;
using System;
using Microsoft.Extensions.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SendGrid.Helpers.Mail;

namespace InvoiceGenerator.Services.Messaging
{
    public class SendGridEmailSender : IEmailSender
    {
        private readonly SendGridClient client;
        private readonly IConfiguration configuration;
        private readonly string emailSender;
        private readonly string emailSenderName;

        public SendGridEmailSender(string apiKey,string emailSender,string emailSenderName )
        {
            this.client = new SendGridClient(apiKey);
            this.emailSender = emailSender;
            this.emailSenderName = emailSenderName;
        }
        public async Task SendEmailAsync(string to, string subject, string htmlContent)
        {
            if (string.IsNullOrWhiteSpace(subject) && string.IsNullOrWhiteSpace(htmlContent))
            {
                throw new ArgumentException("Subject and message should be provided.");
            }
            var fromAddress = new EmailAddress(emailSender, emailSenderName);
            var toAddress = new EmailAddress(to);
            var message = MailHelper.CreateSingleEmail(fromAddress, toAddress, subject, null, htmlContent);

            try
            {
                var response = await this.client.SendEmailAsync(message);

            }
            catch (Exception e)
            {
                Console.Write(e);
                throw;
            }
        }
    }
}
