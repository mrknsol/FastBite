using FastBite.Data.DTOS;
using FastBite.Data.Models;
using FastBite.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FastBite.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreateOrder([FromBody] CreateOrderDTO orderDTO)
        {
            try
            {
                var order = await _orderService.CreateOrderAsync(orderDTO);

                return Ok(order);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
        [Authorize]
        [HttpGet("GetById")]
        public async Task<IActionResult> GetOrderById(Guid orderId)
        {
            try
            {
                var order = await _orderService.GetOrderByIdAsync(orderId);

                if (order == null)
                {
                    return NotFound();
                }

                return Ok(order);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
        [Authorize]
        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAllOrders(string phoneNumber)
        {
            try
            {
                var orders = await _orderService.GetAllOrdersAsync(phoneNumber);
                return Ok(orders);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [Authorize(Roles = "AppAdmin")]
        [HttpPut("Edit")]
        public async Task<IActionResult> UpdateOrder(Guid orderId, [FromBody] CreateOrderDTO orderDTO)
        {
            try
            {
                var updatedOrder = await _orderService.EditOrderAsync(orderId, orderDTO);

                if (updatedOrder == null)
                {
                    return NotFound();
                }

                return Ok(updatedOrder);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
        
        [Authorize(Roles = "AppAdmin")]
        [HttpDelete("Delete")]
        public async Task<IActionResult> DeleteOrder(Guid orderId)
        {
            try
            {
                await _orderService.DeleteOrderAsync(orderId);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
    }
}
