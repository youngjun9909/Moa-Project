package com.korit.moa.moa.controller;

import com.korit.moa.moa.common.constant.ApiMappingPattern;
import com.korit.moa.moa.dto.ResponseDto;
import com.korit.moa.moa.dto.group.request.RequestGroupDto;
import com.korit.moa.moa.dto.group.response.HomeGroupResponseDto;
import com.korit.moa.moa.dto.group.response.ResponseGroupDto;
import com.korit.moa.moa.service.MeetingGroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(ApiMappingPattern.GROUP)
@RequiredArgsConstructor
public class MeetingGroupController {

    private final MeetingGroupService meetingGroupService;

    private static final String UPD_MEETING_GROUP = "/{groupId}";
    private static final String DEL_MEETING_GROUP = "/{groupId}";
    private static final String GET_MEETING_GROUP_HOME = "/home-recommendation";
    private static final String EXISTS_CREATOR = "/exists/{groupId}";
    private static final String GET_MEETING_GROUP = "/{groupId}";

    @PostMapping
    public ResponseEntity<ResponseDto<ResponseGroupDto>> createGroupMeeting(
            @AuthenticationPrincipal String userId,
            @ModelAttribute RequestGroupDto dto
    ) {
        ResponseDto<ResponseGroupDto> response = meetingGroupService.createGroupMeeting(userId, dto);
        HttpStatus status = response.isResult() ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
        return ResponseEntity.status(status).body(response);
    }

    @PutMapping(UPD_MEETING_GROUP)
    public ResponseEntity<ResponseDto<ResponseGroupDto>> updateMeetingGroupId(
            @PathVariable Long groupId,
            @ModelAttribute RequestGroupDto dto
    ) {
        ResponseDto<ResponseGroupDto> response = meetingGroupService.updateMeetingGroupId(groupId, dto);
        HttpStatus status = response.isResult() ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
        return ResponseEntity.status(status).body(response);
    }

    @DeleteMapping(DEL_MEETING_GROUP)
    public ResponseEntity<ResponseDto<Void>> deleteMeetingGroupId(@PathVariable Long groupId) {
        ResponseDto<Void> response = meetingGroupService.deleteMeetingGroupId(groupId);
        HttpStatus status = response.isResult() ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
        return ResponseEntity.status(status).body(response);
    }

    @GetMapping(GET_MEETING_GROUP_HOME)
    public ResponseEntity<ResponseDto<List<HomeGroupResponseDto>>> getGroupAtHome(
            @AuthenticationPrincipal String userId
    ) {
        ResponseDto<List<HomeGroupResponseDto>> response = meetingGroupService.getGroupAtHome(userId);
        HttpStatus status = response.isResult() ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
        return ResponseEntity.status(status).body(response);
    }

    @GetMapping(EXISTS_CREATOR)
    public ResponseEntity<ResponseDto<Boolean>> isCreator(
            @PathVariable Long groupId,
            @AuthenticationPrincipal String userId
    ) {
        ResponseDto<Boolean> response = meetingGroupService.isCreator(groupId, userId);
        HttpStatus status = response.isResult() ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
        return ResponseEntity.status(status).body(response);
    }

    @GetMapping(GET_MEETING_GROUP)
    public ResponseEntity<ResponseDto<ResponseGroupDto>> findGroup(@PathVariable Long groupId) {
        ResponseDto<ResponseGroupDto> response = meetingGroupService.findGroup(groupId);
        HttpStatus status = response.isResult() ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
        return ResponseEntity.status(status).body(response);
    }

}