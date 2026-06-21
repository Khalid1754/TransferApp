namespace TransferApp.API.DTOs
{
    public class ClubDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public string League { get; set; } = string.Empty;
        public string? LogoUrl { get; set; }
    }

    public class CreateClubDto
    {
        public string Name { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public string League { get; set; } = string.Empty;
        public string? LogoUrl { get; set; }
    }
}