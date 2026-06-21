using System.ComponentModel.DataAnnotations;

namespace TransferApp.Models
{
    public class Player
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(150)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(50)]
        public string Position { get; set; } = string.Empty;

        public int Age { get; set; }

        [MaxLength(100)]
        public string Nationality { get; set; } = string.Empty;

        public decimal MarketValue { get; set; }

        public string? PhotoUrl { get; set; }

        // Koppling till API-Football, om datan hämtas därifrån
        public int? ApiFootballId { get; set; }

        // Navigation properties
        public List<TransferListing> TransferListings { get; set; } = new();
    }
}
