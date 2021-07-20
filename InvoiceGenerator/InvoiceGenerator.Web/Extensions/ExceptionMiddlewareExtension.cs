using InvoiceGenerator.Common;
using InvoiceGenerator.Web.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web.Extensions
{
    public static class ExceptionMiddlewareExtension
    {
        public static void ConfigureExceptionHandler(this IApplicationBuilder app, ILogger logger)
        {
            app.UseExceptionHandler(appErr =>
            {
                appErr.Run(async context =>
                {

                    var response = new ResponseViewModel();
                    response.Status = "Unsuccessful";
                    var contextFeature = context.Features.Get<IExceptionHandlerFeature>();
                    var exception = contextFeature.Error;
                    if (exception is InvalidUserDataException)
                    {
                        response.Message = exception.Message;
                        logger.LogWarning(exception, "User enter invalid Data", context.TraceIdentifier);
                        context.Response.StatusCode = 400;

                    }
                    else
                    {
                        logger.LogCritical(context.TraceIdentifier, exception, "Unexpected Error!");
                        response.Message = "Internal server error";
                        context.Response.StatusCode = 500;

                    }

                    string responseAsString = JsonSerializer.Serialize<ResponseViewModel>(response);
                    
                    await context.Response.WriteAsync(responseAsString);
                });
            });
        }
    }
}
