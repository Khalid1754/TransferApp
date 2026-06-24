namespace TransferApp.API.DTOs
{
    public class TransferListingDto
    {
        public int Id { get; set; }
        public decimal AskingPrice { get; set; }
        public string Status { get; set; } = string.Empty;
        public DateTime ListedAt { get; set; }
        public DateTime? ExpiresAt { get; set; }

        // Spelarinfo
        public int PlayerId { get; set; }
        public string PlayerName { get; set; } = string.Empty;
        public string PlayerPosition { get; set; } = string.Empty;
        public int PlayerAge { get; set; }
        public string? PlayerPhotoUrl { get; set; }

        // Klubbinfo
        public int ListedByClubId { get; set; }
        public string ListedByClubName { get; set; } = string.Empty;
    }

    public class CreateTransferListingDto
    {
        public int PlayerId { get; set; }
        public decimal AskingPrice { get; set; }
        public DateTime? ExpiresAt { get; set; }
    }
}