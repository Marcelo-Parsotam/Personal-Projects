using Microsoft.AspNetCore.Mvc;
using u22491717_HW01_API.Models;
using u22491717_HW01_API.Repositories;

namespace u22491717_HW01_API.Controllers
{
    //this Controller establishes the end points of each functionality, this is also what the front end will call to operate
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductsRepository _repository;       //create a variable to the repository

        //connect the string to the repository of IProductRepsoitory
        public ProductController(IProductsRepository repository)
        {
            _repository = repository;
        }

        //This is a Get Request that the API will use to call all product instances
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetAllProdcuts()
        {
            return Ok(await _repository.GetAllProducts());            //return 200 when request is finished
        }

        //This is a Get Request for calling only one product by its Id
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _repository.GetProductById(id);             //calls the repository function for getting one product by id
            return product == null ? NotFound() : Ok(product);              //return 200, if not, not found error
        }

        //This is a Post Request for adding a new instance of a product in the repository
        [HttpPost]
        public async Task<ActionResult<Product>> AddProduct(Product product)
        {
            var newProduct = await _repository.AddProduct(product);                                 //calls the repository function for adding a new product
            return CreatedAtAction(nameof(GetProduct), new { id = newProduct.Id }, newProduct);     //return new product with its new ID
        }

        //This is a PUT Request for updating an existing product
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, Product product)
        {
            if (id != product.Id) return BadRequest();                      //return not found bad request error
            var updateProduct = await _repository.UpdateProduct(product);   //calls repository function for updating to do the update
            return updateProduct == null ? NotFound() : NoContent();        //returns the newly updated product
        }

        //This is a DELETE reqeust for removing a product
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            return await _repository.DeleteStudent(id) ? NoContent() : NotFound();      //calls repository function for deleting, if not exist, return not found error
        }
    }
}
