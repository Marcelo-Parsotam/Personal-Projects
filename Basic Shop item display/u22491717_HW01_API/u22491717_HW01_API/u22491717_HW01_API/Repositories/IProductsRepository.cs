using u22491717_HW01_API.Models;

namespace u22491717_HW01_API.Repositories
{
    //IProductsRepository is used in all ends of the API to call to the front while being called in the API to do its functionality
    public interface IProductsRepository
    {
        //This Task Gets all existing prdoucts in the database
        Task<IEnumerable<Product>> GetAllProducts();

        //This Task Gets a singular product by its id in the database,
        //This will be used for the updating of the product in the front end
        Task<Product?> GetProductById(int id);

        //This Task adds a new product to the database
        Task<Product> AddProduct(Product product);

        //This task updates the description of a product
        Task<Product?> UpdateProduct(Product product);

        //This Task Permanently removes a product from the database
        Task<bool> DeleteStudent(int id);
    }
}
