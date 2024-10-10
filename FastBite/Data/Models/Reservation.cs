namespace FastBite.Data.Models;

public class Reservation {
    public Guid Id { get; set; } = Guid.NewGuid();
    public DateTime Date { get; set; }
    public DateTime ConfirmationDate { get; set; }
    public Guid UserId { get; set; }
    public User User { get; set; }
    public Guid TableId { get; set; }
    public Guid? OrderId { get; set; }
    public Order? Order { get; set; }
    public Table Table { get; set; }
}