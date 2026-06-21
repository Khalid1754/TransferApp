using Microsoft.EntityFrameworkCore;
//using TransferApp.API.Models;
using TransferApp.Models;

namespace TransferApp.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Club> Clubs { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Player> Players { get; set; }
        public DbSet<TransferListing> TransferListings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Club -> Users (1 till många)
            modelBuilder.Entity<User>()
                .HasOne(u => u.Club)
                .WithMany(c => c.Users)
                .HasForeignKey(u => u.ClubId)
                .OnDelete(DeleteBehavior.Cascade);

            // Club -> TransferListings (1 till många)
            modelBuilder.Entity<TransferListing>()
                .HasOne(t => t.ListedByClub)
                .WithMany(c => c.TransferListings)
                .HasForeignKey(t => t.ListedByClubId)
                .OnDelete(DeleteBehavior.Cascade);

            // Player -> TransferListings (1 till många)
            modelBuilder.Entity<TransferListing>()
                .HasOne(t => t.Player)
                .WithMany(p => p.TransferListings)
                .HasForeignKey(t => t.PlayerId)
                .OnDelete(DeleteBehavior.Cascade);

            // Säkerställ att e-post är unik
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            // Spara enums som strängar istället för siffror (lättare att läsa i databasen)
            modelBuilder.Entity<User>()
                .Property(u => u.Role)
                .HasConversion<string>();

            modelBuilder.Entity<TransferListing>()
                .Property(t => t.Status)
                .HasConversion<string>();
        }
    }
}