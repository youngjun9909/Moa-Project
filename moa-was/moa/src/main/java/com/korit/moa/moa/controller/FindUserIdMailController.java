package com.korit.moa.moa.controller;

import com.korit.moa.moa.common.constant.ApiMappingPattern;
import com.korit.moa.moa.dto.ResponseDto;
import com.korit.moa.moa.dto.auth.response.FindIdResponseDto;
import com.korit.moa.moa.dto.mail.FindUserIdMailRequestDto;
import com.korit.moa.moa.service.FindUserIdMailService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(ApiMappingPattern.MAIL)
public class FindUserIdMailController {

    private final FindUserIdMailService findUserIdMailService;

    @PostMapping("/user-id")
    public ResponseEntity<ResponseDto<String>> sendEmail(@RequestBody FindUserIdMailRequestDto dto) throws MessagingException {
        ResponseDto<String> response = findUserIdMailService.sendMessage(dto);
        HttpStatus status = response.isResult() ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
        return ResponseEntity.status(status).body(response);
    }

    @GetMapping("/verification/user-id")
    public ResponseEntity<ResponseDto<FindIdResponseDto>> findLoginId(@RequestParam String token) {
        ResponseDto<FindIdResponseDto> response = findUserIdMailService.verifyEmail(token);
        HttpStatus status = response.isResult() ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
        return ResponseEntity.status(status).body(response);
    }

}
