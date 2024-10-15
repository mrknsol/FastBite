namespace FastBite.Data.DTOS;

public record AccessInfoDTO
(
     string name,
     string email,
     string AccessToken ,
     string RefreshToken ,
     DateTime RefreshTokenExpireTime
);
