using Microsoft.EntityFrameworkCore;
using u22491717_HW01_API.Data;
using u22491717_HW01_API.Models;

namespace u22491717_HW01_API.Repositories
{
    //This Repository calls the IProductsRepository and adds functionality to each task described in it
    public class ProductRepository : IProductsRepository
    {
        //create a connection variable to the database, this only can read the data
        private readonly ApplicationDbContext _context;

        //connect the database and store it to a string
        public ProductRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        //This function retrieves all the Products in the database through a list
        public async Task<IEnumerable<Product>> GetAllProducts()
        {
            return await _context.Products.ToListAsync();
        }

        //This function retrieves the id of a specific product where the ids match
        public async Task<Product?> GetProductById(int id)
        {
            return await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
        }

        //This function adds a newly created product to the database
        public async Task<Product> AddProduct(Product product)
        {
            _context.Products.Add(product);         //adds product to database
            await _context.SaveChangesAsync();      //saves changes to database
            return product;                         //returns the newly created product
        }

        //This function updates products to new values
        public async Task<Product?> UpdateProduct(Product product)
        {
            var existingProduct = await _context.Products.FindAsync(product.Id);    //finds the existing product by id
            if (existingProduct == null) return null;                               //product not found

            existingProduct.Name = product.Name;                                    // change name
            existingProduct.Description = product.Description;                      // chnage description
            existingProduct.Price = product.Price;                                  // change price
            await _context.SaveChangesAsync();                                      // save the changes 
            return existingProduct;                                                 // return the product
        }

        //This function permanently deletes a product from the database
        public async Task<bool> DeleteStudent(int id)
        {
            var product = await _context.Products.FindAsync(id);            // finds the product by id 
            if (product == null) return false;                              // product not found

            _context.Products.Remove(product);                              //delete the product
            await _context.SaveChangesAsync();                              //save the changes
            return true;                                                    // return true for successful deletion
        }
    }
}
