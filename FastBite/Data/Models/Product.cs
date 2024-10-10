using System.ComponentModel.DataAnnotations;

namespace FastBite.Data.Models;

public class Product {

    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; }
    public string Description { get; set; }
    public int Price { get; set; }
    public Guid CategoryId { get; set; }
    public Category Category { get; set; }
    public string ImageUrl { get; set; }
    public ICollection<OrderItem> OrderItems { get; set; }
}