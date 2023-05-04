using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyApp.Migrations
{
    public partial class StartTimeAndSecondsPropertiesSession : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TimeSeconds",
                table: "Sessions",
                newName: "Seconds");

            migrationBuilder.AddColumn<DateTime>(
                name: "StartTime",
                table: "Sessions",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StartTime",
                table: "Sessions");

            migrationBuilder.RenameColumn(
                name: "Seconds",
                table: "Sessions",
                newName: "TimeSeconds");
        }
    }
}
