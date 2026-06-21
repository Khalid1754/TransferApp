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
        public Guid Id { get; set; } = Guid.NewGuid();

        public Guid ClubId { get; set; }
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
