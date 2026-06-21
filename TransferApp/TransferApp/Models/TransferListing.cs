using System.ComponentModel.DataAnnotations;

namespace TransferApp.Models
{
    public enum ListingStatus
    {
        Active,
        Sold,
        Expired,
        Withdrawn
    }

    public class TransferListing
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public Guid PlayerId { get; set; }
        public Player? Player { get; set; }

        public Guid ListedByClubId { get; set; }
        public Club? ListedByClub { get; set; }

        public decimal AskingPrice { get; set; }

        public ListingStatus Status { get; set; } = ListingStatus.Active;

        public DateTime ListedAt { get; set; } = DateTime.UtcNow;

        public DateTime? ExpiresAt { get; set; }
    }
}
