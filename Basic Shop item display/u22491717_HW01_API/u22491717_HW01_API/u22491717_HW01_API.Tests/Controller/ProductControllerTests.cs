using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Collections.Generic;
using System.Threading.Tasks;
using u22491717_HW01_API.Controllers;
using u22491717_HW01_API.Models;
using u22491717_HW01_API.Repositories;
using Xunit;

namespace u22491717_HW01_API.Tests
{
    public class ProductControllerTests
    {
        private readonly Mock<IProductsRepository> _mockRepo;
        private readonly ProductController _controller;

        public ProductControllerTests()
        {
            _mockRepo = new Mock<IProductsRepository>();
            _controller = new ProductController(_mockRepo.Object);
        }

        //This Task tests the GetAllProducts and returns ok with the list of products
        [Fact]
        public async Task GetAllProducts_ReturnsOkResult_WithListOfProducts()
        {
            // Create new data to test for the Repo
            var products = new List<Product>
            {
                new Product { Id = 1, Name = "Product 1", Price = 100 },
                new Product { Id = 2, Name = "Product 2", Price = 200 }
            };
            _mockRepo.Setup(repo => repo.GetAllProducts()).ReturnsAsync(products); //Run the repo test and return the products in the list

            // Test the controller for getting the product list
            var result = await _controller.GetAllProdcuts();

            // Assess the values of each products and checks if they are both correct
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnProducts = Assert.IsAssignableFrom<IEnumerable<Product>>(okResult.Value);
            Assert.NotNull(returnProducts);
            Assert.Equal(2, returnProducts.Count());
        }

        //This Task tests the GetProductById and returns ok with the product
        [Fact]
        public async Task GetProduct_ById_ReturnsOkResult_WithProduct()
        {
            // Create new data to test the repo
            var product = new Product { Id = 1, Name = "Product 1", Price = 100 };         // create new data to test the repo
            _mockRepo.Setup(repo => repo.GetProductById(1)).ReturnsAsync(product);          // this will return the first product item and returns the item

            // Test the controller for getting the product
            var result = await _controller.GetProduct(1);

            // Assess the values of the product and check if it is correct
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnProduct = Assert.IsType<Product>(okResult.Value);
            Assert.NotNull(returnProduct);
            Assert.Equal(1, returnProduct.Id);
        }
    }
}
