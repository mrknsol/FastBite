namespace FastBite.Data.Models;
public class Order {
    public Guid Id { get; set; } = Guid.NewGuid();
    public ICollection<OrderItem> OrderItems { get; set; }
    public int TotalPrice { get; set; }
    public DateTime ConfirmationDate { get; set; }
    public Guid UserId { get; set; }
    public User User { get; set; }
}