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
        public int Id { get; set; }

        public int PlayerId { get; set; }
        public Player? Player { get; set; }

        public int ListedByClubId { get; set; }
        public Club? ListedByClub { get; set; }

        public decimal AskingPrice { get; set; }

        public ListingStatus Status { get; set; } = ListingStatus.Active;

        public DateTime ListedAt { get; set; } = DateTime.UtcNow;

        public DateTime? ExpiresAt { get; set; }
    }
}
