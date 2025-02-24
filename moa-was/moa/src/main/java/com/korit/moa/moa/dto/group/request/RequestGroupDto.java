package com.korit.moa.moa.dto.group.request;

import com.korit.moa.moa.entity.meetingGroup.GroupCategory;
import com.korit.moa.moa.entity.meetingGroup.GroupTypeCategory;
import com.korit.moa.moa.entity.meetingGroup.MeetingTypeCategory;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequestGroupDto {

    @NotBlank
    private String groupTitle;

    @NotBlank
    private String groupContent;

    @NotBlank
    private String groupAddress;

    private MultipartFile groupImage;

    private String groupSupplies;

    @NotBlank
    private String groupDate;

    @NotBlank
    private String groupQuestion;


    private GroupCategory groupCategory;

    @NotBlank
    private GroupTypeCategory groupType;

    @NotBlank
    private MeetingTypeCategory meetingType;
}