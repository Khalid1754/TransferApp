using System.ComponentModel.DataAnnotations;

namespace TransferApp.Models
{
    public class Club
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(100)]
        public string Country { get; set; } = string.Empty;

        [MaxLength(100)]
        public string League { get; set; } = string.Empty;

        public string? LogoUrl { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public List<User> Users { get; set; } = new();
        public List<TransferListing> TransferListings { get; set; } = new();
    }
}
