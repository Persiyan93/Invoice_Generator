using Microsoft.EntityFrameworkCore.Migrations;

namespace InvoiceGenerator.Data.Migrations
{
    public partial class RemoveManyToManyRelation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SellerToBuyer");

            migrationBuilder.AddColumn<string>(
                name: "SellerId",
                table: "Companies",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Companies_SellerId",
                table: "Companies",
                column: "SellerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Companies_Companies_SellerId",
                table: "Companies",
                column: "SellerId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Companies_Companies_SellerId",
                table: "Companies");

            migrationBuilder.DropIndex(
                name: "IX_Companies_SellerId",
                table: "Companies");

            migrationBuilder.DropColumn(
                name: "SellerId",
                table: "Companies");

            migrationBuilder.CreateTable(
                name: "SellerToBuyer",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BuyerId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    ClientId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    SellerId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SellerToBuyer", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SellerToBuyer_Companies_BuyerId",
                        column: x => x.BuyerId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SellerToBuyer_Companies_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SellerToBuyer_Companies_SellerId",
                        column: x => x.SellerId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SellerToBuyer_BuyerId",
                table: "SellerToBuyer",
                column: "BuyerId");

            migrationBuilder.CreateIndex(
                name: "IX_SellerToBuyer_ClientId",
                table: "SellerToBuyer",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_SellerToBuyer_SellerId",
                table: "SellerToBuyer",
                column: "SellerId");
        }
    }
}
