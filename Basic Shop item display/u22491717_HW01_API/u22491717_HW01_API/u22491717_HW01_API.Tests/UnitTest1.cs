using Microsoft.AspNetCore.Mvc;
using Moq;
using u22491717_HW01_API.Controllers;
using u22491717_HW01_API.Models;
using u22491717_HW01_API.Repositories;


namespace u22491717_HW01_API.Tests
{
    public class UnitTest1
    {
        private readonly Mock<IProductsRepository> _mockRepo;
        private readonly ProductController _controller;

        public UnitTest1()
        {
            _mockRepo = new Mock<IProductsRepository>();
            _controller = new ProductController(_mockRepo.Object);
        }

        [Fact]
        public async Task GetAllProducts_ReturnsOkResult_WithListOfProducts()
        {
            // Arrange
            var products = new List<Product>
            {
                new Product { Id = 1, Name = "Product A", Price = 100 },
                new Product { Id = 2, Name = "Product B", Price = 200 }
            };
            _mockRepo.Setup(repo => repo.GetAllProducts()).ReturnsAsync(products);

            // Act
            var result = await _controller.GetAllProdcuts();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnProducts = Assert.IsAssignableFrom<IEnumerable<Product>>(okResult.Value);
            Assert.NotNull(returnProducts);
            Assert.Equal(2, returnProducts.Count());
        }

        [Fact]
        public async Task GetProduct_ById_ReturnsOkResult_WithProduct()
        {
            // Arrange
            var product = new Product { Id = 1, Name = "Product A", Price = 100 };
            _mockRepo.Setup(repo => repo.GetProductById(1)).ReturnsAsync(product);

            // Act
            var result = await _controller.GetProduct(1);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnProduct = Assert.IsType<Product>(okResult.Value);
            Assert.NotNull(returnProduct);
            Assert.Equal(1, returnProduct.Id);
        }
    }
}