using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KontaktAPP.Migrations
{
    /// <inheritdoc />
    public partial class AddphonenumberProp : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "Contact");

            migrationBuilder.AddColumn<int>(
                name: "Phonenumber",
                table: "Contact",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Phonenumber",
                table: "Contact");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Contact",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
