package com.korit.moa.moa.service;

import com.korit.moa.moa.dto.ResponseDto;
import com.korit.moa.moa.dto.group.response.PagedGroupResponseDto;
import com.korit.moa.moa.repository.MeetingGroupRepository;
import com.korit.moa.moa.repository.UserListRepository;
import com.korit.moa.moa.repository.UserRepository;
import com.korit.moa.moa.service.implement.MeetingGroupServiceImplement;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.isNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class MeetingGroupFilterServiceTest {

    @Mock MeetingGroupRepository meetingGroupRepository;
    @Mock UserListRepository userListRepository;
    @Mock UserRepository userRepository;
    @Mock ImgFileService imgFileService;
    @Mock GroupAuthorizationService groupAuthorizationService;
    @InjectMocks MeetingGroupServiceImplement service;

    @Test
    void returnsAllGroupsWhenNoFilterIsSelected() {
        when(meetingGroupRepository.findByOptionalFilters(isNull(), isNull(), any(Pageable.class)))
                .thenReturn(Page.empty());

        ResponseDto<PagedGroupResponseDto> response =
                service.findByGroupCategoryAndRegion(null, null, 1, 12, "default");

        assertTrue(response.isResult());
    }
}
