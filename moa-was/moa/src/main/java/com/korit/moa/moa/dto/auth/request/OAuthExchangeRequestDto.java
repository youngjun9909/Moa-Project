package com.korit.moa.moa.dto.auth.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class OAuthExchangeRequestDto {
    @NotBlank
    private String code;
}
