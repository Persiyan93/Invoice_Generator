using Microsoft.EntityFrameworkCore.Migrations;

namespace InvoiceGenerator.Data.Migrations
{
    public partial class AddArticleHistoryEvent : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ArticleId",
                table: "HistoryEvents",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TypeOfHistoryEvent",
                table: "HistoryEvents",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_HistoryEvents_ArticleId",
                table: "HistoryEvents",
                column: "ArticleId");

            migrationBuilder.AddForeignKey(
                name: "FK_HistoryEvents_Articles_ArticleId",
                table: "HistoryEvents",
                column: "ArticleId",
                principalTable: "Articles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HistoryEvents_Articles_ArticleId",
                table: "HistoryEvents");

            migrationBuilder.DropIndex(
                name: "IX_HistoryEvents_ArticleId",
                table: "HistoryEvents");

            migrationBuilder.DropColumn(
                name: "ArticleId",
                table: "HistoryEvents");

            migrationBuilder.DropColumn(
                name: "TypeOfHistoryEvent",
                table: "HistoryEvents");
        }
    }
}
