using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace SmartSpender.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AccountController : ControllerBase
{
    private readonly AppDbContext _context;

    public AccountController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/Account
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Account>>> GetAccount()
    {
        if (_context.Account == null) return NotFound();
        
        return await _context.Account.ToListAsync();
    }

    // GET: api/Account/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Account>> GetAccount(string email)
    {
        if (_context.Account == null) return NotFound();
        
        var account = await _context.Account.FindAsync(email);

        if (account == null) return NotFound();

        return account;
    }

    // PUT: api/Account/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    public async Task<IActionResult> PutAccount(string email, Account account)
    {
        if (email != account.Email) return BadRequest();

        _context.Entry(account).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!AccountExists(email))
                return NotFound();
            throw;
        }

        return NoContent();
    }

    // POST: api/Account
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public async Task<ActionResult<Account>> PostAccount(Account account)
    {
        if (_context.Account == null) return Problem("Entity set 'AppDbContext.Account'  is null.");
        if (AccountExists(account.Email)) return BadRequest();
        
        _context.Account.Add(account);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetAccount", new { email = account.Email }, account);
    }

    // DELETE: api/Account/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAccount(string email)
    {
        if (_context.Account == null) return NotFound();
        var account = await _context.Account.FindAsync(email);
        if (account == null) return NotFound();

        _context.Account.Remove(account);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool AccountExists(string email)
    {
        return (_context.Account?.Any(e => e.Email == email)).GetValueOrDefault();
    }
}