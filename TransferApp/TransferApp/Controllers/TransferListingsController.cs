using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TransferApp.API.Data;
using TransferApp.API.DTOs;
//using TransferApp.API.Models;
using TransferApp.Models;

namespace TransferApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransferListingsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TransferListingsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/transferlistings  (Transfermarknaden - alla aktiva listings)
        [HttpGet]
        public async Task<ActionResult<List<TransferListingDto>>> GetListings()
        {
            var listings = await _context.TransferListings
                .Include(t => t.Player)
                .Include(t => t.ListedByClub)
                .Where(t => t.Status == ListingStatus.Active)
                .Select(t => new TransferListingDto
                {
                    Id = t.Id,
                    AskingPrice = t.AskingPrice,
                    Status = t.Status.ToString(),
                    ListedAt = t.ListedAt,
                    ExpiresAt = t.ExpiresAt,
                    PlayerId = t.Player!.Id,
                    PlayerName = t.Player.Name,
                    PlayerPosition = t.Player.Position,
                    PlayerAge = t.Player.Age,
                    PlayerPhotoUrl = t.Player.PhotoUrl,
                    ListedByClubId = t.ListedByClub!.Id,
                    ListedByClubName = t.ListedByClub.Name
                })
                .ToListAsync();

            return Ok(listings);
        }

        // GET: api/transferlistings/myclub  (Mina listade spelare)
        [HttpGet("myclub")]
        [Authorize]
        public async Task<ActionResult<List<TransferListingDto>>> GetMyClubListings()
        {
            var clubId = int.Parse(User.FindFirstValue("ClubId")!);

            var listings = await _context.TransferListings
                .Include(t => t.Player)
                .Include(t => t.ListedByClub)
                .Where(t => t.ListedByClubId == clubId)
                .Select(t => new TransferListingDto
                {
                    Id = t.Id,
                    AskingPrice = t.AskingPrice,
                    Status = t.Status.ToString(),
                    ListedAt = t.ListedAt,
                    ExpiresAt = t.ExpiresAt,
                    PlayerId = t.Player!.Id,
                    PlayerName = t.Player.Name,
                    PlayerPosition = t.Player.Position,
                    PlayerAge = t.Player.Age,
                    PlayerPhotoUrl = t.Player.PhotoUrl,
                    ListedByClubId = t.ListedByClub!.Id,
                    ListedByClubName = t.ListedByClub.Name
                })
                .ToListAsync();

            return Ok(listings);
        }

        // POST: api/transferlistings  (Lista en spelare till salu)
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<TransferListingDto>> CreateListing(CreateTransferListingDto request)
        {
            var clubId = int.Parse(User.FindFirstValue("ClubId")!);

            var player = await _context.Players.FindAsync(request.PlayerId);
            if (player == null)
                return BadRequest("Spelaren finns inte.");

            var listing = new TransferListing
            {
                PlayerId = request.PlayerId,
                ListedByClubId = clubId,
                AskingPrice = request.AskingPrice,
                ExpiresAt = request.ExpiresAt,
                Status = ListingStatus.Active
            };

            _context.TransferListings.Add(listing);
            await _context.SaveChangesAsync();

            var club = await _context.Clubs.FindAsync(clubId);

            return Ok(new TransferListingDto
            {
                Id = listing.Id,
                AskingPrice = listing.AskingPrice,
                Status = listing.Status.ToString(),
                ListedAt = listing.ListedAt,
                ExpiresAt = listing.ExpiresAt,
                PlayerId = player.Id,
                PlayerName = player.Name,
                PlayerPosition = player.Position,
                PlayerAge = player.Age,
                PlayerPhotoUrl = player.PhotoUrl,
                ListedByClubId = club!.Id,
                ListedByClubName = club.Name
            });
        }

        // PUT: api/transferlistings/{id}/withdraw  (Ta bort en listing, t.ex. ändrat dig)
        [HttpPut("{id}/withdraw")]
        [Authorize]
        public async Task<IActionResult> WithdrawListing(int id)
        {
            var clubId = int.Parse(User.FindFirstValue("ClubId")!);

            var listing = await _context.TransferListings.FindAsync(id);
            if (listing == null)
                return NotFound();

            if (listing.ListedByClubId != clubId)
                return Forbid(); // Bara klubben som äger listingen får ta bort den

            listing.Status = ListingStatus.Withdrawn;
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}