namespace TransferApp.API.DTOs
{
    public class PlayerDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Position { get; set; } = string.Empty;
        public int Age { get; set; }
        public string Nationality { get; set; } = string.Empty;
        public decimal MarketValue { get; set; }
        public string? PhotoUrl { get; set; }
    }

    public class CreatePlayerDto
    {
        public string Name { get; set; } = string.Empty;
        public string Position { get; set; } = string.Empty;
        public int Age { get; set; }
        public string Nationality { get; set; } = string.Empty;
        public decimal MarketValue { get; set; }
        public string? PhotoUrl { get; set; }
    }
}