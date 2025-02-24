package com.korit.moa.moa.dto.user_list.response;


import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserGenderRatioResponseDto {

    @NotBlank
    private String userGender;

    private Long count;

    private Double ratio;

}
