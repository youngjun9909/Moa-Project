package com.korit.moa.moa.dto.group.request;

import com.korit.moa.moa.entity.meetingGroup.GroupCategory;
import com.korit.moa.moa.entity.meetingGroup.GroupTypeCategory;
import com.korit.moa.moa.entity.meetingGroup.MeetingTypeCategory;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequestGroupDto {

    @NotBlank(message = "모임 제목을 입력해주세요.")
    private String groupTitle;

    @NotBlank(message = "모임 소개를 입력해주세요.")
    private String groupContent;

    @NotBlank(message = "모임 주소를 입력해주세요.")
    private String groupAddress;

    private MultipartFile groupImage;

    private String groupSupplies;

    @NotBlank(message = "모임 날짜를 입력해주세요.")
    private String groupDate;

    @NotBlank(message = "가입 질문을 입력해주세요.")
    private String groupQuestion;


    private GroupCategory groupCategory;

    @NotNull(message = "모임 유형을 선택해주세요.")
    private GroupTypeCategory groupType;

    @NotNull(message = "진행 방식을 선택해주세요.")
    private MeetingTypeCategory meetingType;
}
