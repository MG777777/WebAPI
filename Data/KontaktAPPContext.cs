using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using KontaktAPP.Models;

namespace KontaktAPP.Data
{
    public class KontaktAPPContext : DbContext
    {
        public KontaktAPPContext (DbContextOptions<KontaktAPPContext> options)
            : base(options)
        {
        }

        public DbSet<Contact> Contact { get; set; } = default!;
    }
}
