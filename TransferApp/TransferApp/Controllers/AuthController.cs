using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TransferApp.API.Data;
using TransferApp.API.DTOs;
//using TransferApp.API.Models;
using TransferApp.API.Services;
using TransferApp.Models;

namespace TransferApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly AuthService _authService;

        public AuthController(AppDbContext context, AuthService authService)
        {
            _context = context;
            _authService = authService;
        }

        // POST: api/auth/register
        [HttpPost("register")]
        public async Task<ActionResult<AuthResponseDto>> Register(RegisterDto request)
        {
            // Kolla att klubben finns
            var clubExists = await _context.Clubs.AnyAsync(c => c.Id == request.ClubId);
            if (!clubExists)
                return BadRequest("Klubben finns inte.");

            // Kolla att email inte redan används
            var emailExists = await _context.Users.AnyAsync(u => u.Email == request.Email);
            if (emailExists)
                return BadRequest("Denna email är redan registrerad.");

            // Validera roll
            if (!Enum.TryParse<UserRole>(request.Role, true, out var role))
                return BadRequest("Ogiltig roll. Använd Owner, Coach eller Admin.");

            var user = new User
            {
                Email = request.Email,
                PasswordHash = _authService.HashPassword(request.Password),
                ClubId = request.ClubId,
                Role = role
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var token = _authService.GenerateToken(user);

            return Ok(new AuthResponseDto
            {
                Token = token,
                Email = user.Email,
                Role = user.Role.ToString(),
                ClubId = user.ClubId
            });
        }

        // POST: api/auth/login
        [HttpPost("login")]
        public async Task<ActionResult<AuthResponseDto>> Login(LoginDto request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null || !_authService.VerifyPassword(request.Password, user.PasswordHash))
                return Unauthorized("Fel email eller lösenord.");

            var token = _authService.GenerateToken(user);

            return Ok(new AuthResponseDto
            {
                Token = token,
                Email = user.Email,
                Role = user.Role.ToString(),
                ClubId = user.ClubId
            });
        }
    }
}