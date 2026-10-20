package com.korit.moa.moa.dto.auth.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OAuthExchangeResponseDto {
    private String token;
    private int expiration;
}
