package com.korit.moa.moa.dto.group.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class PagedGroupResponseDto {
    private List<SearchResponseDto> data;
    private int page;
    private int size;
    private int totalPages;
    private long totalElements;
}
