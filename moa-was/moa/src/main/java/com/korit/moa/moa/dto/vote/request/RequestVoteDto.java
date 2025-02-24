package com.korit.moa.moa.dto.vote.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestVoteDto {

    @NotBlank
    private Long groupId;

    @NotBlank
    private String creatorId;

    @NotBlank
    private String voteContent;

    @NotBlank
    private Date createDate;

    @NotBlank
    private Date closeDate;
}
