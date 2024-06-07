using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace identity_service.Migrations
{
    /// <inheritdoc />
    public partial class adding_salt_and_hashedPassword : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Password",
                table: "Identities",
                newName: "Salt");

            migrationBuilder.AddColumn<string>(
                name: "HashedPassword",
                table: "Identities",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "UserLoginAttempt",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    AttemptsCount = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserLoginAttempt", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserLoginAttempt_Identities_UserId",
                        column: x => x.UserId,
                        principalTable: "Identities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserLoginAttempt_Id",
                table: "UserLoginAttempt",
                column: "Id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserLoginAttempt_UserId",
                table: "UserLoginAttempt",
                column: "UserId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserLoginAttempt");

            migrationBuilder.DropColumn(
                name: "HashedPassword",
                table: "Identities");

            migrationBuilder.RenameColumn(
                name: "Salt",
                table: "Identities",
                newName: "Password");
        }
    }
}
