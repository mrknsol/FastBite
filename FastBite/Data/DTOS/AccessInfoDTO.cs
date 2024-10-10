namespace FastBite.Data.DTOS;

public record AccessInfoDTO
(
     string AccessToken ,
     string RefreshToken ,
     DateTime RefreshTokenExpireTime
);
