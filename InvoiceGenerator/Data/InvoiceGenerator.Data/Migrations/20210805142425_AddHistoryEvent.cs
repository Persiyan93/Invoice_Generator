using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace InvoiceGenerator.Data.Migrations
{
    public partial class AddHistoryEvent : Migration
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

            migrationBuilder.AddColumn<decimal>(
                name: "ArticlePrice",
                table: "InvoiceToArticle",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

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

            migrationBuilder.AddColumn<int>(
                name: "ArticleNumber",
                table: "Articles",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "HistoryEvents",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    DateOfEvent = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EventType = table.Column<int>(type: "int", nullable: false),
                    AdditionalText = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    InvoiceId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HistoryEvents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HistoryEvents_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_HistoryEvents_Invoices_InvoiceId",
                        column: x => x.InvoiceId,
                        principalTable: "Invoices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_HistoryEvents_InvoiceId",
                table: "HistoryEvents",
                column: "InvoiceId");

            migrationBuilder.CreateIndex(
                name: "IX_HistoryEvents_UserId",
                table: "HistoryEvents",
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
                name: "HistoryEvents");

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
                name: "ArticleNumber",
                table: "Articles");

            migrationBuilder.RenameColumn(
                name: "PaymentPeriod",
                table: "Invoices",
                newName: "AdditionalOptions");

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
