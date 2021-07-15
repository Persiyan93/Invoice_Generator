using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace InvoiceGenerator.Data.Migrations
{
    public partial class AddNewEntities : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Company_RegisteredCompanyId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_Invoices_Company_BuyerId",
                table: "Invoices");

            migrationBuilder.DropIndex(
                name: "IX_Invoices_BuyerId",
                table: "Invoices");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_RegisteredCompanyId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "BuyerId",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "RegisteredCompanyId",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "VatRate",
                table: "Invoices",
                newName: "DiscountPercentage");

            migrationBuilder.RenameColumn(
                name: "Price",
                table: "Invoices",
                newName: "VatValue");

            migrationBuilder.RenameColumn(
                name: "EmailAddress",
                table: "ContactPeople",
                newName: "Email");

            migrationBuilder.AlterColumn<string>(
                name: "CreatedByUserId",
                table: "Invoices",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AdditionalOptions",
                table: "Invoices",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "DateOfTaxEvent",
                table: "Invoices",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "Language",
                table: "Invoices",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PaymentMethod",
                table: "Invoices",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "PriceWithoutVat",
                table: "Invoices",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Invoices",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "DefaultInvoiceOptinsId",
                table: "Company",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Company",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CompanyId",
                table: "Articles",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "VatRate",
                table: "Articles",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.CreateTable(
                name: "DefaultInvoiceOptions",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CompanyId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    DefaultPaymentTerm = table.Column<int>(type: "int", nullable: false),
                    DefaultLanguage = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DefaultInvoiceOptions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DefaultInvoiceOptions_Company_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Company",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Invoices_CreatedByUserId",
                table: "Invoices",
                column: "CreatedByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Articles_CompanyId",
                table: "Articles",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_DefaultInvoiceOptions_CompanyId",
                table: "DefaultInvoiceOptions",
                column: "CompanyId",
                unique: true,
                filter: "[CompanyId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Articles_Company_CompanyId",
                table: "Articles",
                column: "CompanyId",
                principalTable: "Company",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Invoices_AspNetUsers_CreatedByUserId",
                table: "Invoices",
                column: "CreatedByUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Articles_Company_CompanyId",
                table: "Articles");

            migrationBuilder.DropForeignKey(
                name: "FK_Invoices_AspNetUsers_CreatedByUserId",
                table: "Invoices");

            migrationBuilder.DropTable(
                name: "DefaultInvoiceOptions");

            migrationBuilder.DropIndex(
                name: "IX_Invoices_CreatedByUserId",
                table: "Invoices");

            migrationBuilder.DropIndex(
                name: "IX_Articles_CompanyId",
                table: "Articles");

            migrationBuilder.DropColumn(
                name: "AdditionalOptions",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "DateOfTaxEvent",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "Language",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "PaymentMethod",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "PriceWithoutVat",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "DefaultInvoiceOptinsId",
                table: "Company");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Company");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "Articles");

            migrationBuilder.DropColumn(
                name: "VatRate",
                table: "Articles");

            migrationBuilder.RenameColumn(
                name: "VatValue",
                table: "Invoices",
                newName: "Price");

            migrationBuilder.RenameColumn(
                name: "DiscountPercentage",
                table: "Invoices",
                newName: "VatRate");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "ContactPeople",
                newName: "EmailAddress");

            migrationBuilder.AlterColumn<string>(
                name: "CreatedByUserId",
                table: "Invoices",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BuyerId",
                table: "Invoices",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RegisteredCompanyId",
                table: "AspNetUsers",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Invoices_BuyerId",
                table: "Invoices",
                column: "BuyerId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_RegisteredCompanyId",
                table: "AspNetUsers",
                column: "RegisteredCompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Company_RegisteredCompanyId",
                table: "AspNetUsers",
                column: "RegisteredCompanyId",
                principalTable: "Company",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Invoices_Company_BuyerId",
                table: "Invoices",
                column: "BuyerId",
                principalTable: "Company",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
