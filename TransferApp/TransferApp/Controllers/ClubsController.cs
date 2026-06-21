using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TransferApp.API.Data;
using TransferApp.API.DTOs;
//using TransferApp.API.Models;
using TransferApp.Models;

namespace TransferApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClubsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ClubsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/clubs
        [HttpGet]
        public async Task<ActionResult<List<ClubDto>>> GetClubs()
        {
            var clubs = await _context.Clubs
                .Select(c => new ClubDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    Country = c.Country,
                    League = c.League,
                    LogoUrl = c.LogoUrl
                })
                .ToListAsync();

            return Ok(clubs);
        }

        // GET: api/clubs/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ClubDto>> GetClub(Guid id)
        {
            var club = await _context.Clubs.FindAsync(id);

            if (club == null)
                return NotFound();

            var dto = new ClubDto
            {
                Id = club.Id,
                Name = club.Name,
                Country = club.Country,
                League = club.League,
                LogoUrl = club.LogoUrl
            };

            return Ok(dto);
        }

        // POST: api/clubs
        [HttpPost]
        public async Task<ActionResult<ClubDto>> CreateClub(CreateClubDto request)
        {
            var club = new Club
            {
                Name = request.Name,
                Country = request.Country,
                League = request.League,
                LogoUrl = request.LogoUrl
            };

            _context.Clubs.Add(club);
            await _context.SaveChangesAsync();

            var dto = new ClubDto
            {
                Id = club.Id,
                Name = club.Name,
                Country = club.Country,
                League = club.League,
                LogoUrl = club.LogoUrl
            };

            return CreatedAtAction(nameof(GetClub), new { id = club.Id }, dto);
        }
    }
}