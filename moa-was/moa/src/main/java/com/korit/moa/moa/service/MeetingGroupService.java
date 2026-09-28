package com.korit.moa.moa.service;

import com.korit.moa.moa.dto.ResponseDto;
import com.korit.moa.moa.dto.group.request.RequestGroupDto;
import com.korit.moa.moa.dto.group.response.HomeGroupResponseDto;
import com.korit.moa.moa.dto.group.response.ResponseGroupDto;
import com.korit.moa.moa.dto.group.response.SearchResponseDto;
import com.korit.moa.moa.dto.group.response.PagedGroupResponseDto;
import com.korit.moa.moa.entity.meetingGroup.GroupCategory;
import com.korit.moa.moa.entity.meetingGroup.GroupTypeCategory;

import java.util.List;

public interface MeetingGroupService {

    ResponseDto<ResponseGroupDto> createGroupMeeting(String userId, RequestGroupDto dto);

    ResponseDto<ResponseGroupDto> updateMeetingGroupId(Long groupId, String userId, RequestGroupDto dto);

    ResponseDto<Void> deleteMeetingGroupId(Long groupId, String userId);

    ResponseDto<PagedGroupResponseDto> findByGroupTitle(String keyword, int page, int size, String sortBy);

    ResponseDto<PagedGroupResponseDto> findByGroupType(GroupTypeCategory groupType, int page, int size, String sortBy);

    ResponseDto<PagedGroupResponseDto> findByGroupCategoryAndRegion(
            GroupCategory groupCategory, String region, int page, int size, String sortBy);

    ResponseDto<List<HomeGroupResponseDto>> getGroupAtHome(String userId);

    ResponseDto<List<HomeGroupResponseDto>> getGroupAtHomeAuth();

    ResponseDto<ResponseGroupDto> getGroupById(Long groupId);

    ResponseDto<Boolean> isCreator(Long groupId, String userId);

    ResponseDto<ResponseGroupDto> findGroup(Long groupId);
}
