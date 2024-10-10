using AutoMapper;
using FastBite.Data.DTOS;
using FastBite.Data.Models;
using System.Linq;

namespace FastBite.Data.Configs
{
    public class MappingConfiguration
    {
        public static Mapper InitializeConfig()
        {
            var mapperConfig = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<User, RegisterDTO>()
                    .ConstructUsing(u => new RegisterDTO(u.Name, u.Surname, u.Email, u.phoneNumber, "", ""))
                    .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                    .ForMember(dest => dest.Surname, opt => opt.MapFrom(src => src.Surname))
                    .ForMember(dest => dest.phoneNumber, opt => opt.MapFrom(src => src.phoneNumber))
                    .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                    .ForMember(dest => dest.ConfirmPassword, opt => opt.Ignore())
                    .ReverseMap()
                    .ForMember(dest => dest.Password, opt => opt.Ignore());
                cfg.CreateMap<Reservation, ReservationDTO>()
                    .ConstructUsing(r => new ReservationDTO(
                        r.Date,
                        r.Table.Capacity,
                        r.User.Id,
                        r.Order != null ? new CreateOrderDTO(
                            r.Order.Id,
                            r.Order.OrderItems.Select(oi => new OrderProductDTO(
                                oi.Product.Name,
                                oi.Quantity)).ToList(),
                            r.User.phoneNumber
                        ) : null))
                    .ForMember(dest => dest.date, opt => opt.MapFrom(src => src.Date))
                    .ForMember(dest => dest.TableCapacity, opt => opt.MapFrom(src => src.Table.Capacity))
                    .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.User.Id))
                    .ForMember(dest => dest.Order, opt => opt.MapFrom(src => src.Order != null ? new CreateOrderDTO(
                        src.Order.Id,
                        src.Order.OrderItems.Select(oi => new OrderProductDTO(
                            oi.Product.Name,
                            oi.Quantity)).ToList(),
                        src.User.phoneNumber
                    ) : null))
                    .ReverseMap();

                cfg.CreateMap<Order, CreateOrderDTO>()
                    .ConstructUsing(o => new CreateOrderDTO(
                        o.Id,
                        o.OrderItems.Select(oi => new OrderProductDTO(
                            oi.Product.Name,
                            oi.Quantity)).ToList(),
                        o.User.phoneNumber
                    ))
                    .ForMember(dest => dest.ProductNames, opt => opt.MapFrom(src => src.OrderItems.Select(oi => new OrderProductDTO(
                        oi.Product.Name,
                        oi.Quantity)).ToList()))
                    .ForMember(dest => dest.phoneNumber, opt => opt.MapFrom(src => src.User.phoneNumber)) // Добавляем этот маппинг
                    .ReverseMap();

                cfg.CreateMap<OrderItem, OrderProductDTO>()
                    .ConstructUsing(src => new OrderProductDTO(
                        src.Product.Name,
                        src.Quantity))
                    .ForMember(dest => dest.ProductName, opt => opt.MapFrom(src => src.Product.Name))
                    .ForMember(dest => dest.Quantity, opt => opt.MapFrom(src => src.Quantity))
                    .ReverseMap()
                    .ForMember(dest => dest.Product, opt => opt.Ignore()) 
                    .ForMember(dest => dest.Order, opt => opt.Ignore());

                cfg.CreateMap<AppRole, RoleDTO>()
                    .ConstructUsing(role => new RoleDTO(role.Name))
                    .ForMember(dest => dest.name, opt => opt.MapFrom(src => src.Name))
                    .ReverseMap();
                
                cfg.CreateMap<Product, ProductDTO>()
                    .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                    .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                    .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.Name))
                    .ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(src => src.ImageUrl))
                    .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Price))
                    .ReverseMap()
                    .ForMember(dest => dest.Category, opt => opt.Ignore())
                    .ForMember(dest => dest.CategoryId, opt => opt.Ignore())
                    .ForMember(dest => dest.Id, opt => opt.Ignore());
            });

            mapperConfig.AssertConfigurationIsValid();

            var mapper = new Mapper(mapperConfig);
            return mapper;
        }
    }
}