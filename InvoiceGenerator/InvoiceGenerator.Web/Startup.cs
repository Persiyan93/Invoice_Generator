using InvoiceGenerator.Data;
using InvoiceGenerator.Data.Models;
using InvoiceGenerator.Data.Seeding;
using InvoiceGenerator.Services.CloadStorageService;
using InvoiceGenerator.Services.Data;
using InvoiceGenerator.Services.Mapping;
using InvoiceGenerator.Services.Messaging;

using InvoiceGenerator.Web.Extensions;
using InvoiceGenerator.Web.Models;
using InvoiceGenerator.Web.Models.Identity;
using InvoiceGenerator.Common.Resources;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Text;
using InvoiceGenerator.Services.PdfService;
using System.Threading.Tasks;

namespace InvoiceGenerator.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //Connect app with MS SQL SERVER
            services.AddDbContext<ApplicationDbContext>(options =>
                    options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"))
            );


            //Add Identity with JWT 
            services.AddIdentity<ApplicationUser, ApplicationRole>(IdentityOptionsProvider.GetIdentityOptions)
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidAudience = Configuration["JWT:ValidAudience"],
                    ValidIssuer = Configuration["JWT:ValidIssuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWT:Secret"]))
                };
                options.Events = new JwtBearerEvents
                {
                    OnChallenge = async context =>
                    {
                        context.HandleResponse();
                        context.Response.StatusCode = 401;
                        await context.Response.WriteAsJsonAsync(new ResponseViewModel { Message = "Not authorized", Status = "Unsuccessful" });
                    },
                    OnMessageReceived = context =>
                    {
                        context.Token = context.Request.Cookies["auth"];
                        return Task.CompletedTask;
                    }
                    
                };

            });


            //Add memory Cache
             services.AddMemoryCache();
            //Add Culture
            services.AddLocalization();

            services.Configure<RequestLocalizationOptions>(
                options =>
                {
                    var supportedCultures = new List<CultureInfo>
                    {
                        new CultureInfo("en"),
                        new CultureInfo("bg")
                    };
                    options.DefaultRequestCulture = new RequestCulture("bg");
                    options.SupportedCultures = supportedCultures;
                    options.SupportedUICultures = supportedCultures;

                });

            services.AddControllers()
                    .AddDataAnnotationsLocalization(options => {
                        options.DataAnnotationLocalizerProvider = (type, factory) =>
                            factory.Create(typeof(ValidationResources));
                    });



            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.InvalidModelStateResponseFactory = context =>
                {
                    return new OkObjectResult(new ResponseViewModel
                    {
                        Status = "Unsuccessful",
                        Message = context.ModelState.Values
                            .SelectMany(x => x.Errors)
                            .Select(x => x.ErrorMessage)
                            .FirstOrDefault()

                    });

                };
            });



            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            services.AddTransient<IDropBoxService>(x =>
            new DropBoxService(this.Configuration["DropBox:ApiKey"]));
            services.AddTransient<ICloudService>(x => new CloudService(this.Configuration["AzureStorage:ConnectionString"]));
            services.AddTransient<IEmailSender>(x =>
            new SendGridEmailSender(
                this.Configuration["SendGrid:ApiKey"],
                this.Configuration["SendGrid:EmailSender"],
                this.Configuration["SendGrid:EmailSenderName"]));
            services.AddTransient<IPdfService, PdfService>();
            services.AddTransient<ICompanyService, CompanyService>();
            services.AddTransient<IAddressService, AddressService>();
            services.AddTransient<IClientService, ClientService>();
            services.AddTransient<IContactListService, ContactListService>();
            services.AddTransient<IArticleService, ArticleService>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IInvoiceService, InvoiceService>();
           
            services.AddTransient<IIdentityService, IdentityService>();
            services.AddTransient<IOfferedService, OfferedServices>();
            services.AddTransient<IHistoryEventService, HistoryEventService>();
            services.AddTransient<INotificationService, NotificationService>();
            services.AddTransient<ICompanySettingsService, CompanySettingsService>();
            services.AddTransient<IHomePageContentService, HomePageContentService>();
            services.AddTransient<IBankAccountService, BankAccountService>();
            services.AddApplicationInsightsTelemetry(Configuration["APPINSIGHTS_CONNECTIONSTRING"]);




        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILogger<Startup> logger)
        {
            if (env.IsDevelopment())
            {
                app.ConfigureExceptionHandler(logger);
                //app.UseDeveloperExceptionPage();
            }
            else
            {
                app.ConfigureExceptionHandler(logger);
                //app.UseExceptionHandler("/Error");
                //// The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                //app.UseHsts();
            }

            app.UseCors(options =>

              options.AllowAnyMethod()
              .AllowAnyHeader()
              .SetIsOriginAllowed(origin => true)
              .AllowCredentials());

            //var locatlizationOptions = app.ApplicationServices.GetRequiredService<IOptions<RequestLocalizationOptions>>();
            //var cookieProvider = locatlizationOptions.Value.RequestCultureProviders.OfType<CookieRequestCultureProvider>().First();
            //cookieProvider.CookieName = "language";
            //locatlizationOptions.Value


            app.UseRequestLocalization();



            //Register Automaper 
            AutoMapperConfig.RegisterMappings(typeof(LoginInputModel).GetTypeInfo().Assembly);



            //Seeding Data
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                var dbContext = serviceScope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                dbContext.Database.Migrate();
                new ApplicationSeeder().SeedAsync(dbContext, serviceScope.ServiceProvider, Configuration).GetAwaiter().GetResult();
            }



            app.UseHttpsRedirection();

            app.UseStaticFiles();

            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
