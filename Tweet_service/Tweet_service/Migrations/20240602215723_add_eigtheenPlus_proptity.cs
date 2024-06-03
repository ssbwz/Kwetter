using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Tweet_service.Migrations
{
    /// <inheritdoc />
    public partial class add_eigtheenPlus_proptity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsEighteenPlus",
                table: "Tweets",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsEighteenPlus",
                table: "Tweets");
        }
    }
}
