using Microsoft.EntityFrameworkCore;
using u22491717_HW01_API.Models;

namespace u22491717_HW01_API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>().HasData(
                new Product { Id = 1, Name = "Running shoes", Description = "comfortable running shoes", Price = 9.99m },
                new Product { Id = 2, Name = "T-shirt", Description = "cotton T-Shirt", Price = 19.99m }
                ); 
        }
    }
}
