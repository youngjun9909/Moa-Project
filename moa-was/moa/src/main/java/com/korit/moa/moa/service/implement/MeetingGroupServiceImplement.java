package com.korit.moa.moa.service.implement;

import com.korit.moa.moa.common.constant.ResponseMessage;
import com.korit.moa.moa.dto.ResponseDto;
import com.korit.moa.moa.dto.group.request.RequestGroupDto;
import com.korit.moa.moa.dto.group.response.HomeGroupResponseDto;
import com.korit.moa.moa.dto.group.response.ResponseGroupDto;
import com.korit.moa.moa.dto.group.response.SearchResponseDto;
import com.korit.moa.moa.dto.group.response.PagedGroupResponseDto;
import com.korit.moa.moa.entity.meetingGroup.GroupCategory;
import com.korit.moa.moa.entity.meetingGroup.GroupTypeCategory;
import com.korit.moa.moa.entity.meetingGroup.MeetingGroup;
import com.korit.moa.moa.entity.meetingGroup.MeetingTypeCategory;
import com.korit.moa.moa.entity.user.User;
import com.korit.moa.moa.entity.userList.UserLevel;
import com.korit.moa.moa.entity.userList.UserList;
import com.korit.moa.moa.entity.userList.UserListId;
import com.korit.moa.moa.repository.MeetingGroupRepository;
import com.korit.moa.moa.repository.UserListRepository;
import com.korit.moa.moa.repository.UserRepository;
import com.korit.moa.moa.service.ImgFileService;
import com.korit.moa.moa.service.GroupAuthorizationService;
import com.korit.moa.moa.service.MeetingGroupService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@Service
@RequiredArgsConstructor
public class MeetingGroupServiceImplement implements MeetingGroupService {

    public final MeetingGroupRepository meetingGroupRepository;
    public final UserListRepository userListRepository;
    public final UserRepository userRepository;
    private final ImgFileService imgFileService;
    private final GroupAuthorizationService groupAuthorizationService;

    @Override
    public ResponseDto<ResponseGroupDto> createGroupMeeting(String userId, RequestGroupDto dto) {

        String creatorId = userId;
        String groupTitle = dto.getGroupTitle();
        String groupContent = dto.getGroupContent();
        String groupAddress = dto.getGroupAddress();
        String groupSupplies = dto.getGroupSupplies();
        String groupDate = dto.getGroupDate();
        String groupQuestion = dto.getGroupQuestion();
        GroupCategory groupCategory = dto.getGroupCategory();
        GroupTypeCategory groupType = dto.getGroupType();
        MeetingTypeCategory meetingType = dto.getMeetingType();

        if(creatorId ==  null || creatorId.isEmpty()){
            return ResponseDto.setFailed((ResponseMessage.VALIDATION_FAIL));
        }
        if (groupTitle == null || groupTitle.isEmpty()){
            return ResponseDto.setFailed(ResponseMessage.VALIDATION_FAIL );
        }
        if (groupContent == null || groupContent.isEmpty()){
            return ResponseDto.setFailed(ResponseMessage.VALIDATION_FAIL );
        }
        if (groupAddress == null || groupAddress.isEmpty()){
            return ResponseDto.setFailed(ResponseMessage.VALIDATION_FAIL );
        }
        if (groupDate == null || groupDate.isEmpty()){
            return ResponseDto.setFailed(ResponseMessage.VALIDATION_FAIL );
        }
        if (groupQuestion == null || groupQuestion.isEmpty()){
            return ResponseDto.setFailed(ResponseMessage.VALIDATION_FAIL );
        }
        if (groupType == null){
            return ResponseDto.setFailed(ResponseMessage.VALIDATION_FAIL );
        }
        if (meetingType == null){
            return ResponseDto.setFailed(ResponseMessage.VALIDATION_FAIL );
        }
        if(meetingGroupRepository.existsByGroupTitle(dto.getGroupTitle())){
            return ResponseDto.setFailed(ResponseMessage.EXIST_DATA);
        }

        try{
            String groupImgPath = null;
            if(dto.getGroupImage() != null) {
                groupImgPath = imgFileService.convertImgFile(dto.getGroupImage(), "groupImg");
            }

            MeetingGroup meetingGroup = MeetingGroup.builder()
                    .creatorId(userId)
                    .groupTitle(groupTitle)
                    .groupContent(groupContent)
                    .groupAddress(groupAddress)
                    .groupImage(groupImgPath)
                    .groupSupplies(groupSupplies)
                    .groupDate(groupDate)
                    .groupQuestion(groupQuestion)
                    .groupCategory(groupCategory)
                    .groupType(groupType)
                    .meetingType(meetingType)
                    .build();

            meetingGroupRepository.save(meetingGroup);


            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
            String profileImgPath = user.getProfileImage();

            UserListId userListId = new UserListId();
            userListId.setGroupId(meetingGroup.getGroupId());
            userListId.setUserId(creatorId);

            String nickName =  userRepository.findByUserNickName(userId);
            UserList userList =  UserList.builder()
                    .id(userListId)
                    .user(User.builder().userId(creatorId).build())
                    .group(meetingGroup)
                    .userLevel(UserLevel.관리자)
                    .nickName(nickName)
                    .joinDate(new Date())
                    .profileImage(profileImgPath)
                    .build();
            userListRepository.save(userList);
            ResponseGroupDto data =  new ResponseGroupDto(meetingGroup);

            return ResponseDto.setSuccess(ResponseMessage.SUCCESS,data);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }

    }

    @Override
    public ResponseDto<ResponseGroupDto> updateMeetingGroupId(Long groupId, String userId, RequestGroupDto dto) {
        ResponseGroupDto data = null;

        if (groupId == null ){
            return ResponseDto.setFailed(ResponseMessage.NOT_EXIST_GROUP);
        }
        if (!groupAuthorizationService.isManager(groupId, userId)) {
            return ResponseDto.setFailed(ResponseMessage.NO_PERMISSION);
        }

        try {
            MeetingGroup meetingGroup =  meetingGroupRepository.findById(groupId)
                    .orElseThrow(() ->  new IllegalAccessException("모임을 찾을수 없습니다" + groupId));

            String groupImgPath = null;
            if (dto.getGroupImage() != null) {
                groupImgPath = imgFileService.convertImgFile(dto.getGroupImage(), "groupImg");
            }

            meetingGroup.setGroupTitle(dto.getGroupTitle() != null ?
                    dto.getGroupTitle() : meetingGroup.getGroupTitle());

            meetingGroup.setGroupContent(dto.getGroupContent() != null ?
                    dto.getGroupContent() : meetingGroup.getGroupContent());

            meetingGroup.setGroupAddress(dto.getGroupAddress() != null ?
                    dto.getGroupAddress() : meetingGroup.getGroupAddress());

            meetingGroup.setGroupImage(groupImgPath != null ?
                    groupImgPath : meetingGroup.getGroupImage());

            meetingGroup.setGroupSupplies(dto.getGroupSupplies() != null ?
                    dto.getGroupSupplies() : meetingGroup.getGroupSupplies());

            meetingGroup.setGroupCategory(dto.getGroupCategory() != null ?
                    dto.getGroupCategory() : meetingGroup.getGroupCategory());

            meetingGroup.setGroupType(dto.getGroupType() != null ?
                    dto.getGroupType() : meetingGroup.getGroupType());

            meetingGroup.setMeetingType(dto.getMeetingType() != null ?
                    dto.getMeetingType() : meetingGroup.getMeetingType());

            meetingGroupRepository.save(meetingGroup);
            data = new ResponseGroupDto(meetingGroup);

            return  ResponseDto.setSuccess(ResponseMessage.SUCCESS,data);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }
    }

    @Override
    @Transactional
    public ResponseDto<Void> deleteMeetingGroupId(Long groupId, String userId) {
        if(groupId == null){
            return ResponseDto.setFailed(ResponseMessage.MESSAGE_SEND_FAIL);
        }
        if (!groupAuthorizationService.isManager(groupId, userId)) {
            return ResponseDto.setFailed(ResponseMessage.NO_PERMISSION);
        }
        try {
            Optional<MeetingGroup> optionalMeetingGroup = meetingGroupRepository.findById(groupId);

            if(optionalMeetingGroup.isPresent()){
                meetingGroupRepository.deleteById(groupId);
            }
            return ResponseDto.setSuccess(ResponseMessage.SUCCESS,null);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }

    }

    @Override
    public ResponseDto<List<HomeGroupResponseDto>> getGroupAtHome(String userId) {
        List<HomeGroupResponseDto> data = null;

        if(userId == null) {
            return ResponseDto.setFailed(ResponseMessage.NO_PERMISSION);
        }

        try {
            Optional<List<MeetingGroup>> optionalMeetingGroups = meetingGroupRepository.findGroupByUserId(userId);

            if(optionalMeetingGroups.isPresent()) {
                List<MeetingGroup> meetingGroups = optionalMeetingGroups.get();

                data = meetingGroups.stream()
                        .map(HomeGroupResponseDto::new)
                        .collect(Collectors.toList());
            } else {
                return ResponseDto.setFailed(ResponseMessage.NOT_EXIST_GROUP);
            }

        } catch(Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }
        return ResponseDto.setSuccess(ResponseMessage.SUCCESS, data);

    }

    @Override
    public ResponseDto<List<HomeGroupResponseDto>> getGroupAtHomeAuth() {
        List<HomeGroupResponseDto> data = null;

        try {
            Optional<List<MeetingGroup>> optionalMeetingGroups = meetingGroupRepository.findGroupRandom();

            if(optionalMeetingGroups.isPresent()) {
                List<MeetingGroup> meetingGroups = optionalMeetingGroups.get();

                data = meetingGroups.stream()
                        .map(HomeGroupResponseDto::new)
                        .collect(Collectors.toList());
            } else {
                return ResponseDto.setFailed(ResponseMessage.NOT_EXIST_GROUP);
            }

        } catch(Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }
        return ResponseDto.setSuccess(ResponseMessage.SUCCESS, data);

    }

    @Override
    public ResponseDto<PagedGroupResponseDto> findByGroupTitle(String keyword, int page, int size, String sortBy) {

        if (keyword == null || keyword.trim().isEmpty()) {
            return ResponseDto.setFailed(ResponseMessage.NOT_EXIST_DATA);
        }

        try {
            Page<MeetingGroup> groups = meetingGroupRepository.findByGroupTitle(keyword, createPageable(page, size, sortBy));
            return ResponseDto.setSuccess(ResponseMessage.SUCCESS, toPagedResponse(groups, page, size));
        } catch(Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }

    }

    @Override
    public ResponseDto<PagedGroupResponseDto> findByGroupType(GroupTypeCategory groupType, int page, int size, String sortBy) {
        if (groupType == null) {
            return ResponseDto.setFailed(ResponseMessage.NOT_EXIST_DATA);
        }

        try {
            Page<MeetingGroup> groups = meetingGroupRepository.findByGroupType(
                    groupType, createPageable(page, size, sortBy));
            return ResponseDto.setSuccess(ResponseMessage.SUCCESS, toPagedResponse(groups, page, size));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }
    }

    @Override
    public ResponseDto<PagedGroupResponseDto> findByGroupCategoryAndRegion(
            GroupCategory groupCategory, String region, int page, int size, String sortBy) {

        if (groupCategory == null) {
            return ResponseDto.setFailed(ResponseMessage.NOT_EXIST_DATA);
        }
        if (region == null || region.toString().trim().isEmpty()) {
            return ResponseDto.setFailed(ResponseMessage.NOT_EXIST_DATA);
        }

        try {
            Page<MeetingGroup> groups = meetingGroupRepository.findByGroupCategoryAndRegion(
                    groupCategory, region, createPageable(page, size, sortBy));
            return ResponseDto.setSuccess(ResponseMessage.SUCCESS, toPagedResponse(groups, page, size));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }
    }

    private Pageable createPageable(int page, int size, String sortBy) {
        int safePage = Math.max(page, 1) - 1;
        int safeSize = Math.min(Math.max(size, 1), 50);
        Sort sort = switch (sortBy == null ? "default" : sortBy) {
            case "recent", "past" -> Sort.by("groupDate");
            default -> Sort.by("groupId");
        };
        if ("recent".equals(sortBy)) {
            sort = sort.descending();
        }
        return PageRequest.of(safePage, safeSize, sort);
    }

    private PagedGroupResponseDto toPagedResponse(Page<MeetingGroup> groups, int page, int size) {
        List<SearchResponseDto> data = groups.getContent().stream()
                .map(SearchResponseDto::new)
                .collect(Collectors.toList());
        return new PagedGroupResponseDto(data, Math.max(page, 1), Math.min(Math.max(size, 1), 50),
                groups.getTotalPages(), groups.getTotalElements());
    }

    @Override
    public ResponseDto<ResponseGroupDto> getGroupById(Long groupId) {
        ResponseGroupDto data = null;

        try{
            Optional<MeetingGroup> optionalGroup = meetingGroupRepository.findById(groupId);
            if(optionalGroup.isEmpty()) {
                return ResponseDto.setFailed(ResponseMessage.NOT_EXIST_DATA);
            }

            MeetingGroup meetingGroup = optionalGroup.get();
            data = new ResponseGroupDto(meetingGroup);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }
        return ResponseDto.setSuccess(ResponseMessage.SUCCESS, data);
    }

    @Override
    public ResponseDto<Boolean> isCreator(Long groupId, String userId) {
        Boolean data = null;

        try{
            data = meetingGroupRepository.existsByGroupIdAndCreatorId(groupId, userId);

            if (data) {
                return ResponseDto.setSuccess(ResponseMessage.SUCCESS, true);
            } else {
                return  ResponseDto.setSuccess(ResponseMessage.SUCCESS, false);
            }

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }
    }

    @Override
    public ResponseDto<ResponseGroupDto> findGroup(Long groupId) {
        ResponseGroupDto data = null;

        try{
            Optional<MeetingGroup> optionalGroup = meetingGroupRepository.findById(groupId);
            if(optionalGroup.isEmpty()) {
                return ResponseDto.setFailed(ResponseMessage.NOT_EXIST_DATA);
            }

            MeetingGroup meetingGroup = optionalGroup.get();
            data = new ResponseGroupDto(meetingGroup);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }
        return ResponseDto.setSuccess(ResponseMessage.SUCCESS, data);
    }

}
