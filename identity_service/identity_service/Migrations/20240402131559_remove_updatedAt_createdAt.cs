using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace identity_service.Migrations
{
    /// <inheritdoc />
    public partial class remove_updatedAt_createdAt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "Identities");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "Identities");

            migrationBuilder.CreateIndex(
                name: "IX_Identities_Email",
                table: "Identities",
                column: "Email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Identities_Email",
                table: "Identities");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "Identities",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "Identities",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
