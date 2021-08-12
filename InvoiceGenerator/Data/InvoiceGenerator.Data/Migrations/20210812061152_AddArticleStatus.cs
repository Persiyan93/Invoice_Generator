using Microsoft.EntityFrameworkCore.Migrations;

namespace InvoiceGenerator.Data.Migrations
{
    public partial class AddArticleStatus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Articles",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Services");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Articles");

            migrationBuilder.RenameColumn(
                name: "UnitPrice",
                table: "Articles",
                newName: "Price");
        }
    }
}
