using Microsoft.AspNetCore.Authorization;
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
    public class PlayersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PlayersController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/players
        [HttpGet]
        public async Task<ActionResult<List<PlayerDto>>> GetPlayers()
        {
            var players = await _context.Players
                .Select(p => new PlayerDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Position = p.Position,
                    Age = p.Age,
                    Nationality = p.Nationality,
                    MarketValue = p.MarketValue,
                    PhotoUrl = p.PhotoUrl
                })
                .ToListAsync();

            return Ok(players);
        }

        // GET: api/players/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<PlayerDto>> GetPlayer(int id)
        {
            var player = await _context.Players.FindAsync(id);

            if (player == null)
                return NotFound();

            return Ok(new PlayerDto
            {
                Id = player.Id,
                Name = player.Name,
                Position = player.Position,
                Age = player.Age,
                Nationality = player.Nationality,
                MarketValue = player.MarketValue,
                PhotoUrl = player.PhotoUrl
            });
        }

        // POST: api/players
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<PlayerDto>> CreatePlayer(CreatePlayerDto request)
        {
            var player = new Player
            {
                Name = request.Name,
                Position = request.Position,
                Age = request.Age,
                Nationality = request.Nationality,
                MarketValue = request.MarketValue,
                PhotoUrl = request.PhotoUrl
            };

            _context.Players.Add(player);
            await _context.SaveChangesAsync();

            var dto = new PlayerDto
            {
                Id = player.Id,
                Name = player.Name,
                Position = player.Position,
                Age = player.Age,
                Nationality = player.Nationality,
                MarketValue = player.MarketValue,
                PhotoUrl = player.PhotoUrl
            };

            return CreatedAtAction(nameof(GetPlayer), new { id = player.Id }, dto);
        }
    }
}