package com.korit.moa.moa.controller;

import com.korit.moa.moa.dto.ResponseDto;
import com.korit.moa.moa.dto.group.request.RequestGroupDto;
import com.korit.moa.moa.dto.group.response.ResponseGroupDto;
import com.korit.moa.moa.service.MeetingGroupService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.method.annotation.AuthenticationPrincipalArgumentResolver;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMultipartHttpServletRequestBuilder;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class MeetingGroupRegistrationTest {
    private MeetingGroupService service;
    private MockMvc mvc;

    @BeforeEach void setup() {
        service = mock(MeetingGroupService.class);
        // Real multipart binding and Jakarta validation; no database writes.
        mvc = MockMvcBuilders.standaloneSetup(new MeetingGroupController(service))
                .setCustomArgumentResolvers(new AuthenticationPrincipalArgumentResolver()).build();
        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken("fixture-user", null, List.of()));
    }

    @AfterEach void cleanup() { SecurityContextHolder.clearContext(); }

    private Map<String, String> fields() {
        Map<String, String> values = new LinkedHashMap<>();
        values.put("groupTitle", "등록 검증 모임");
        values.put("groupContent", "함께 책을 읽어요");
        values.put("groupAddress", "온라인");
        values.put("groupDate", "2026-10-20");
        values.put("groupQuestion", "좋아하는 책은?");
        values.put("groupCategory", "취미");
        values.put("groupType", "단기모임");
        values.put("meetingType", "온라인");
        return values;
    }

    private MockMultipartHttpServletRequestBuilder request(Map<String, String> values) {
        MockMultipartHttpServletRequestBuilder request = multipart("/api/v1/meeting-group");
        values.forEach(request::param);
        return request;
    }

    @ParameterizedTest
    @CsvSource({"단기모임,온라인", "단기모임,오프라인", "정기모임,온라인", "정기모임,오프라인"})
    void validMultipartMeetingReachesSaveInsteadOfThrowingValidationException(String groupType, String meetingType) throws Exception {
        Map<String, String> values = fields();
        values.put("groupType", groupType);
        values.put("meetingType", meetingType);
        ResponseGroupDto saved = new ResponseGroupDto();
        saved.setGroupId(71L);
        when(service.createGroupMeeting(eq("fixture-user"), any(RequestGroupDto.class)))
                .thenReturn(ResponseDto.setSuccess("Success", saved));

        mvc.perform(request(values)).andExpect(status().isOk())
                .andExpect(jsonPath("$.result").value(true)).andExpect(jsonPath("$.data.groupId").value(71));
        var dto = org.mockito.ArgumentCaptor.forClass(RequestGroupDto.class);
        verify(service).createGroupMeeting(eq("fixture-user"), dto.capture());
        assertEquals(groupType, dto.getValue().getGroupType().name());
        assertEquals(meetingType, dto.getValue().getMeetingType().name());
        assertEquals("취미", dto.getValue().getGroupCategory().name());
    }

    @ParameterizedTest
    @ValueSource(strings = {"groupTitle", "groupContent", "groupAddress", "groupDate", "groupQuestion", "groupType", "meetingType"})
    void missingRequiredFieldReturns400WithoutSaving(String field) throws Exception {
        Map<String, String> values = fields();
        values.remove(field);
        mvc.perform(request(values)).andExpect(status().isBadRequest())
                .andExpect(content().contentTypeCompatibleWith("application/json"))
                .andExpect(jsonPath("$.result").value(false))
                .andExpect(jsonPath("$.data." + field).isString());
        verifyNoInteractions(service);
    }

    @ParameterizedTest
    @ValueSource(strings = {"groupType", "meetingType"})
    void unknownEnumReturns400WithoutSaving(String field) throws Exception {
        Map<String, String> values = fields();
        values.put(field, "unknown");
        mvc.perform(request(values)).andExpect(status().isBadRequest());
        verifyNoInteractions(service);
    }
}
