using System.ComponentModel.DataAnnotations;

namespace TransferApp.Models
{
    public enum UserRole
    {
        Owner,
        Coach,
        Admin
    }

    public class User
    {
        public int Id { get; set; }

        public int ClubId { get; set; }
        public Club? Club { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        public UserRole Role { get; set; } = UserRole.Coach;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
