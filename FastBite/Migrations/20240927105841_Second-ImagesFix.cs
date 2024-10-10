using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FastBite.Migrations
{
    /// <inheritdoc />
    public partial class SecondImagesFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageData",
                table: "Products");

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Products",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "https://fastbite.blob.core.windows.net/fastbite-productimages/noimage.jpg.webp");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Products");

            migrationBuilder.AddColumn<byte[]>(
                name: "ImageData",
                table: "Products",
                type: "varbinary(max)",
                maxLength: 1048576,
                nullable: false,
                defaultValue: new byte[0]);
        }
    }
}
