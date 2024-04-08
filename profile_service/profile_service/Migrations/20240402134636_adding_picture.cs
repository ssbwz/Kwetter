using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace profile_service.Migrations
{
    /// <inheritdoc />
    public partial class adding_picture : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Profiles",
                newName: "Bio");

            migrationBuilder.AddColumn<byte[]>(
                name: "ProfileImage",
                table: "Profiles",
                type: "bytea",
                nullable: false,
                defaultValue: new byte[0]);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProfileImage",
                table: "Profiles");

            migrationBuilder.RenameColumn(
                name: "Bio",
                table: "Profiles",
                newName: "Description");
        }
    }
}
