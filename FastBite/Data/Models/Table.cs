namespace FastBite.Data.Models;
public class Table
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public int Capacity { get; set; }
    public bool Reserved { get; set; }
}