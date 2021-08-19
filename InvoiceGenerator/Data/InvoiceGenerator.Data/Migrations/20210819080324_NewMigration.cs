using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace InvoiceGenerator.Data.Migrations
{
    public partial class NewMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InvoiceToArticle_Invoices_InvoiceId",
                table: "InvoiceToArticle");

            migrationBuilder.DropColumn(
                name: "DiscountPercentage",
                table: "Invoices");

            migrationBuilder.RenameColumn(
                name: "AdditionalOptions",
                table: "Invoices",
                newName: "PaymentPeriod");

            migrationBuilder.RenameColumn(
                name: "Price",
                table: "Articles",
                newName: "UnitPrice");

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Services",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "ArticlePrice",
                table: "InvoiceToArticle",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AlterColumn<decimal>(
                name: "VatValue",
                table: "Invoices",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "PriceWithoutVat",
                table: "Invoices",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "PaymentDueDate",
                table: "Invoices",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "IssueDate",
                table: "Invoices",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateOfTaxEvent",
                table: "Invoices",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsInvoiceWithZeroVatRate",
                table: "Invoices",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "ReasonForInvoiceWithZeroVatRate",
                table: "Invoices",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "BlockClientWhenReachMaxCountOfUnpaidInvoices",
                table: "DefaultInvoiceOptions",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "MaxCountOfUnPaidInvoices",
                table: "DefaultInvoiceOptions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PeriodInDaysBetweenTwoRepatedEmails",
                table: "DefaultInvoiceOptions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "SendAutomaticGeneratedEmails",
                table: "DefaultInvoiceOptions",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Company",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "AspNetUsers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ArticleNumber",
                table: "Articles",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<double>(
                name: "QuantityLowerLimit",
                table: "Articles",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<bool>(
                name: "QuantityMonitoring",
                table: "Articles",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Articles",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Emails",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RegisteredCompanyId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    ClientId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Message = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Emails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Emails_Company_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Company",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Emails_Company_RegisteredCompanyId",
                        column: x => x.RegisteredCompanyId,
                        principalTable: "Company",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "HistoryEvent",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    DateOfEvent = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EventType = table.Column<int>(type: "int", nullable: false),
                    AdditionalText = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BulgarianMessage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    CompanyId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    TypeOfHistoryEvent = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ArticleId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    InvoiceId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HistoryEvent", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HistoryEvent_Articles_ArticleId",
                        column: x => x.ArticleId,
                        principalTable: "Articles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_HistoryEvent_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_HistoryEvent_Company_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Company",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_HistoryEvent_Invoices_InvoiceId",
                        column: x => x.InvoiceId,
                        principalTable: "Invoices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "HomePageContents",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BulgarainName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Type = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HomePageContents", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Notifications",
                columns: table => new
                {
                    NotificationId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CompanyId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Type = table.Column<int>(type: "int", nullable: false),
                    Message = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ArticleId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    InvoiceId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notifications", x => x.NotificationId);
                    table.ForeignKey(
                        name: "FK_Notifications_Articles_ArticleId",
                        column: x => x.ArticleId,
                        principalTable: "Articles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Notifications_Company_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Company",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Notifications_Invoices_InvoiceId",
                        column: x => x.InvoiceId,
                        principalTable: "Invoices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "HomePageContentToUser",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    HomePageContentId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HomePageContentToUser", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HomePageContentToUser_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_HomePageContentToUser_HomePageContents_HomePageContentId",
                        column: x => x.HomePageContentId,
                        principalTable: "HomePageContents",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "NotificationToUser",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    NotificationId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Status = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NotificationToUser", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NotificationToUser_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_NotificationToUser_Notifications_NotificationId",
                        column: x => x.NotificationId,
                        principalTable: "Notifications",
                        principalColumn: "NotificationId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Emails_ClientId",
                table: "Emails",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_Emails_RegisteredCompanyId",
                table: "Emails",
                column: "RegisteredCompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_HistoryEvent_ArticleId",
                table: "HistoryEvent",
                column: "ArticleId");

            migrationBuilder.CreateIndex(
                name: "IX_HistoryEvent_CompanyId",
                table: "HistoryEvent",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_HistoryEvent_InvoiceId",
                table: "HistoryEvent",
                column: "InvoiceId");

            migrationBuilder.CreateIndex(
                name: "IX_HistoryEvent_UserId",
                table: "HistoryEvent",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_HomePageContentToUser_HomePageContentId",
                table: "HomePageContentToUser",
                column: "HomePageContentId");

            migrationBuilder.CreateIndex(
                name: "IX_HomePageContentToUser_UserId",
                table: "HomePageContentToUser",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_ArticleId",
                table: "Notifications",
                column: "ArticleId");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_CompanyId",
                table: "Notifications",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_InvoiceId",
                table: "Notifications",
                column: "InvoiceId");

            migrationBuilder.CreateIndex(
                name: "IX_NotificationToUser_NotificationId",
                table: "NotificationToUser",
                column: "NotificationId");

            migrationBuilder.CreateIndex(
                name: "IX_NotificationToUser_UserId",
                table: "NotificationToUser",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_InvoiceToArticle_Invoices_InvoiceId",
                table: "InvoiceToArticle",
                column: "InvoiceId",
                principalTable: "Invoices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InvoiceToArticle_Invoices_InvoiceId",
                table: "InvoiceToArticle");

            migrationBuilder.DropTable(
                name: "Emails");

            migrationBuilder.DropTable(
                name: "HistoryEvent");

            migrationBuilder.DropTable(
                name: "HomePageContentToUser");

            migrationBuilder.DropTable(
                name: "NotificationToUser");

            migrationBuilder.DropTable(
                name: "HomePageContents");

            migrationBuilder.DropTable(
                name: "Notifications");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Services");

            migrationBuilder.DropColumn(
                name: "ArticlePrice",
                table: "InvoiceToArticle");

            migrationBuilder.DropColumn(
                name: "IsInvoiceWithZeroVatRate",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "ReasonForInvoiceWithZeroVatRate",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "BlockClientWhenReachMaxCountOfUnpaidInvoices",
                table: "DefaultInvoiceOptions");

            migrationBuilder.DropColumn(
                name: "MaxCountOfUnPaidInvoices",
                table: "DefaultInvoiceOptions");

            migrationBuilder.DropColumn(
                name: "PeriodInDaysBetweenTwoRepatedEmails",
                table: "DefaultInvoiceOptions");

            migrationBuilder.DropColumn(
                name: "SendAutomaticGeneratedEmails",
                table: "DefaultInvoiceOptions");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Company");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "ArticleNumber",
                table: "Articles");

            migrationBuilder.DropColumn(
                name: "QuantityLowerLimit",
                table: "Articles");

            migrationBuilder.DropColumn(
                name: "QuantityMonitoring",
                table: "Articles");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Articles");

            migrationBuilder.RenameColumn(
                name: "PaymentPeriod",
                table: "Invoices",
                newName: "AdditionalOptions");

            migrationBuilder.RenameColumn(
                name: "UnitPrice",
                table: "Articles",
                newName: "Price");

            migrationBuilder.AlterColumn<decimal>(
                name: "VatValue",
                table: "Invoices",
                type: "decimal(18,2)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AlterColumn<decimal>(
                name: "PriceWithoutVat",
                table: "Invoices",
                type: "decimal(18,2)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AlterColumn<DateTime>(
                name: "PaymentDueDate",
                table: "Invoices",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<DateTime>(
                name: "IssueDate",
                table: "Invoices",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateOfTaxEvent",
                table: "Invoices",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AddColumn<double>(
                name: "DiscountPercentage",
                table: "Invoices",
                type: "float",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_InvoiceToArticle_Invoices_InvoiceId",
                table: "InvoiceToArticle",
                column: "InvoiceId",
                principalTable: "Invoices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
