using Microsoft.EntityFrameworkCore.Migrations;

namespace InvoiceGenerator.Data.Migrations
{
    public partial class ReneameProperties : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Companies_CompanyId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Companies_RegisteredCompanyId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_Companies_Addresses_AddressId",
                table: "Companies");

            migrationBuilder.DropForeignKey(
                name: "FK_Companies_Addresses_MailingAddressId",
                table: "Companies");

            migrationBuilder.DropForeignKey(
                name: "FK_Companies_Companies_SellerId",
                table: "Companies");

            migrationBuilder.DropForeignKey(
                name: "FK_ContactPeople_Companies_ClientId",
                table: "ContactPeople");

            migrationBuilder.DropForeignKey(
                name: "FK_Invoices_Companies_BuyerId",
                table: "Invoices");

            migrationBuilder.DropForeignKey(
                name: "FK_Invoices_Companies_SellerId",
                table: "Invoices");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Companies",
                table: "Companies");

            migrationBuilder.RenameTable(
                name: "Companies",
                newName: "Company");

            migrationBuilder.RenameIndex(
                name: "IX_Companies_SellerId",
                table: "Company",
                newName: "IX_Company_SellerId");

            migrationBuilder.RenameIndex(
                name: "IX_Companies_MailingAddressId",
                table: "Company",
                newName: "IX_Company_MailingAddressId");

            migrationBuilder.RenameIndex(
                name: "IX_Companies_AddressId",
                table: "Company",
                newName: "IX_Company_AddressId");

            migrationBuilder.AddColumn<string>(
                name: "ClientId",
                table: "Invoices",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AccontablePersonName",
                table: "Company",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AdministratorId",
                table: "Company",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Company",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Company",
                table: "Company",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Invoices_ClientId",
                table: "Invoices",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_Company_AdministratorId",
                table: "Company",
                column: "AdministratorId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Company_CompanyId",
                table: "AspNetUsers",
                column: "CompanyId",
                principalTable: "Company",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Company_RegisteredCompanyId",
                table: "AspNetUsers",
                column: "RegisteredCompanyId",
                principalTable: "Company",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Company_Addresses_AddressId",
                table: "Company",
                column: "AddressId",
                principalTable: "Addresses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Company_Addresses_MailingAddressId",
                table: "Company",
                column: "MailingAddressId",
                principalTable: "Addresses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Company_AspNetUsers_AdministratorId",
                table: "Company",
                column: "AdministratorId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Company_Company_SellerId",
                table: "Company",
                column: "SellerId",
                principalTable: "Company",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ContactPeople_Company_ClientId",
                table: "ContactPeople",
                column: "ClientId",
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

            migrationBuilder.AddForeignKey(
                name: "FK_Invoices_Company_ClientId",
                table: "Invoices",
                column: "ClientId",
                principalTable: "Company",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Invoices_Company_SellerId",
                table: "Invoices",
                column: "SellerId",
                principalTable: "Company",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Company_CompanyId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Company_RegisteredCompanyId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_Company_Addresses_AddressId",
                table: "Company");

            migrationBuilder.DropForeignKey(
                name: "FK_Company_Addresses_MailingAddressId",
                table: "Company");

            migrationBuilder.DropForeignKey(
                name: "FK_Company_AspNetUsers_AdministratorId",
                table: "Company");

            migrationBuilder.DropForeignKey(
                name: "FK_Company_Company_SellerId",
                table: "Company");

            migrationBuilder.DropForeignKey(
                name: "FK_ContactPeople_Company_ClientId",
                table: "ContactPeople");

            migrationBuilder.DropForeignKey(
                name: "FK_Invoices_Company_BuyerId",
                table: "Invoices");

            migrationBuilder.DropForeignKey(
                name: "FK_Invoices_Company_ClientId",
                table: "Invoices");

            migrationBuilder.DropForeignKey(
                name: "FK_Invoices_Company_SellerId",
                table: "Invoices");

            migrationBuilder.DropIndex(
                name: "IX_Invoices_ClientId",
                table: "Invoices");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Company",
                table: "Company");

            migrationBuilder.DropIndex(
                name: "IX_Company_AdministratorId",
                table: "Company");

            migrationBuilder.DropColumn(
                name: "ClientId",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "AccontablePersonName",
                table: "Company");

            migrationBuilder.DropColumn(
                name: "AdministratorId",
                table: "Company");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Company");

            migrationBuilder.RenameTable(
                name: "Company",
                newName: "Companies");

            migrationBuilder.RenameIndex(
                name: "IX_Company_SellerId",
                table: "Companies",
                newName: "IX_Companies_SellerId");

            migrationBuilder.RenameIndex(
                name: "IX_Company_MailingAddressId",
                table: "Companies",
                newName: "IX_Companies_MailingAddressId");

            migrationBuilder.RenameIndex(
                name: "IX_Company_AddressId",
                table: "Companies",
                newName: "IX_Companies_AddressId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Companies",
                table: "Companies",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Companies_CompanyId",
                table: "AspNetUsers",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Companies_RegisteredCompanyId",
                table: "AspNetUsers",
                column: "RegisteredCompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Companies_Addresses_AddressId",
                table: "Companies",
                column: "AddressId",
                principalTable: "Addresses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Companies_Addresses_MailingAddressId",
                table: "Companies",
                column: "MailingAddressId",
                principalTable: "Addresses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Companies_Companies_SellerId",
                table: "Companies",
                column: "SellerId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ContactPeople_Companies_ClientId",
                table: "ContactPeople",
                column: "ClientId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Invoices_Companies_BuyerId",
                table: "Invoices",
                column: "BuyerId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Invoices_Companies_SellerId",
                table: "Invoices",
                column: "SellerId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
