using System;
using System.Threading.Tasks;

namespace InvoiceGenerator.Services.Messaging
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string to, string subject, string htmlContent);
    }
}
