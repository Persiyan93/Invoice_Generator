using Microsoft.EntityFrameworkCore.Migrations;

namespace InvoiceGenerator.Data.Migrations
{
    public partial class BulgarianMessages : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HistoryEvent_Articles_ArticleId",
                table: "HistoryEvent");

            migrationBuilder.DropForeignKey(
                name: "FK_HistoryEvent_AspNetUsers_UserId",
                table: "HistoryEvent");

            migrationBuilder.DropForeignKey(
                name: "FK_HistoryEvent_Company_CompanyId",
                table: "HistoryEvent");

            migrationBuilder.DropForeignKey(
                name: "FK_HistoryEvent_Invoices_InvoiceId",
                table: "HistoryEvent");

            migrationBuilder.DropPrimaryKey(
                name: "PK_HistoryEvent",
                table: "HistoryEvent");

            migrationBuilder.RenameTable(
                name: "HistoryEvent",
                newName: "HistoryEvents");

            migrationBuilder.RenameIndex(
                name: "IX_HistoryEvent_UserId",
                table: "HistoryEvents",
                newName: "IX_HistoryEvents_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_HistoryEvent_InvoiceId",
                table: "HistoryEvents",
                newName: "IX_HistoryEvents_InvoiceId");

            migrationBuilder.RenameIndex(
                name: "IX_HistoryEvent_CompanyId",
                table: "HistoryEvents",
                newName: "IX_HistoryEvents_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_HistoryEvent_ArticleId",
                table: "HistoryEvents",
                newName: "IX_HistoryEvents_ArticleId");

            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId",
                table: "HistoryEvents",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InvoiceHistoryEvent_ApplicationUserId",
                table: "HistoryEvents",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_HistoryEvents",
                table: "HistoryEvents",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_HistoryEvents_ApplicationUserId",
                table: "HistoryEvents",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_HistoryEvents_InvoiceHistoryEvent_ApplicationUserId",
                table: "HistoryEvents",
                column: "InvoiceHistoryEvent_ApplicationUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_HistoryEvents_Articles_ArticleId",
                table: "HistoryEvents",
                column: "ArticleId",
                principalTable: "Articles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_HistoryEvents_AspNetUsers_ApplicationUserId",
                table: "HistoryEvents",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_HistoryEvents_AspNetUsers_InvoiceHistoryEvent_ApplicationUserId",
                table: "HistoryEvents",
                column: "InvoiceHistoryEvent_ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_HistoryEvents_AspNetUsers_UserId",
                table: "HistoryEvents",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_HistoryEvents_Company_CompanyId",
                table: "HistoryEvents",
                column: "CompanyId",
                principalTable: "Company",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_HistoryEvents_Invoices_InvoiceId",
                table: "HistoryEvents",
                column: "InvoiceId",
                principalTable: "Invoices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HistoryEvents_Articles_ArticleId",
                table: "HistoryEvents");

            migrationBuilder.DropForeignKey(
                name: "FK_HistoryEvents_AspNetUsers_ApplicationUserId",
                table: "HistoryEvents");

            migrationBuilder.DropForeignKey(
                name: "FK_HistoryEvents_AspNetUsers_InvoiceHistoryEvent_ApplicationUserId",
                table: "HistoryEvents");

            migrationBuilder.DropForeignKey(
                name: "FK_HistoryEvents_AspNetUsers_UserId",
                table: "HistoryEvents");

            migrationBuilder.DropForeignKey(
                name: "FK_HistoryEvents_Company_CompanyId",
                table: "HistoryEvents");

            migrationBuilder.DropForeignKey(
                name: "FK_HistoryEvents_Invoices_InvoiceId",
                table: "HistoryEvents");

            migrationBuilder.DropPrimaryKey(
                name: "PK_HistoryEvents",
                table: "HistoryEvents");

            migrationBuilder.DropIndex(
                name: "IX_HistoryEvents_ApplicationUserId",
                table: "HistoryEvents");

            migrationBuilder.DropIndex(
                name: "IX_HistoryEvents_InvoiceHistoryEvent_ApplicationUserId",
                table: "HistoryEvents");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "HistoryEvents");

            migrationBuilder.DropColumn(
                name: "InvoiceHistoryEvent_ApplicationUserId",
                table: "HistoryEvents");

            migrationBuilder.RenameTable(
                name: "HistoryEvents",
                newName: "HistoryEvent");

            migrationBuilder.RenameIndex(
                name: "IX_HistoryEvents_UserId",
                table: "HistoryEvent",
                newName: "IX_HistoryEvent_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_HistoryEvents_InvoiceId",
                table: "HistoryEvent",
                newName: "IX_HistoryEvent_InvoiceId");

            migrationBuilder.RenameIndex(
                name: "IX_HistoryEvents_CompanyId",
                table: "HistoryEvent",
                newName: "IX_HistoryEvent_CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_HistoryEvents_ArticleId",
                table: "HistoryEvent",
                newName: "IX_HistoryEvent_ArticleId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_HistoryEvent",
                table: "HistoryEvent",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_HistoryEvent_Articles_ArticleId",
                table: "HistoryEvent",
                column: "ArticleId",
                principalTable: "Articles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_HistoryEvent_AspNetUsers_UserId",
                table: "HistoryEvent",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_HistoryEvent_Company_CompanyId",
                table: "HistoryEvent",
                column: "CompanyId",
                principalTable: "Company",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_HistoryEvent_Invoices_InvoiceId",
                table: "HistoryEvent",
                column: "InvoiceId",
                principalTable: "Invoices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
