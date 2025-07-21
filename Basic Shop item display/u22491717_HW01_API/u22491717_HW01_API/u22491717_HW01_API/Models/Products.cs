using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace u22491717_HW01_API.Models
{
    //This is the prdoucts model that we use throughout the project
    public class Product
    {
        //The Id is a key there must exist for the object to be fully functional
        [Key]
        public int Id { get; set; }
        //Name is required so that all products hold a name
        [Required]
        public string? Name { get; set; }
        //Description is also required so that all products has detail
        [Required]
        public string? Description { get; set; }
        //All products must have a price
        [Required]  
        public decimal Price { get; set; }
    }
}
