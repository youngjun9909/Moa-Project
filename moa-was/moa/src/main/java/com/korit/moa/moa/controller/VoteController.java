package com.korit.moa.moa.controller;

import com.korit.moa.moa.common.constant.ApiMappingPattern;
import com.korit.moa.moa.dto.ResponseDto;
import com.korit.moa.moa.dto.vote.request.RequestUpdateVoteDto;
import com.korit.moa.moa.dto.vote.request.RequestVoteDto;
import com.korit.moa.moa.dto.vote.response.PostVoteResponseDto;
import com.korit.moa.moa.dto.vote.response.VoteResponseDto;
import com.korit.moa.moa.service.VoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(ApiMappingPattern.VOTE)
@RequiredArgsConstructor
public class VoteController {

    private final VoteService voteService;

    private static final String GET_VOTE = "/{groupId}";
    private static final String PUT_VOTE = "/{voteId}";
    private static final String EXIST_VOTE = "exists-vote/{groupId}";


    @GetMapping(GET_VOTE)
    public ResponseEntity<ResponseDto<VoteResponseDto>> getMyGroupVote(
            @PathVariable Long groupId
    ) {
        ResponseDto<VoteResponseDto> response = voteService.getMyGroupVote(groupId);
        HttpStatus status = response.isResult() ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
        return ResponseEntity.status(status).body(response);
    }

    @PostMapping
    public ResponseEntity<ResponseDto<PostVoteResponseDto>> postMyGroupVote(
            @RequestBody RequestVoteDto dto,
            @AuthenticationPrincipal String userId
    ) {
        ResponseDto<PostVoteResponseDto> response = voteService.postMyGroupVote(dto, userId);
        HttpStatus status = response.isResult() ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
        return ResponseEntity.status(status).body(response);
    }

    @PutMapping(PUT_VOTE)
    public ResponseEntity<ResponseDto<VoteResponseDto>> updateMyGroupVote(
            @PathVariable Long voteId,
            @RequestBody RequestUpdateVoteDto dto
    ) {
        ResponseDto<VoteResponseDto> response = voteService.updateMyGroupVote(voteId,dto);
        HttpStatus status = response.isResult() ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
        return ResponseEntity.status(status).body(response);
    }

    @DeleteMapping(PUT_VOTE)
    public ResponseEntity<ResponseDto<Void>> deleteMyGroupVote(
            @PathVariable Long voteId
    ) {
        ResponseDto<Void> response = voteService.deleteMyGroupVote(voteId);
        HttpStatus status = response.isResult() ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
        return ResponseEntity.status(status).body(response);
    }

    @GetMapping(EXIST_VOTE)
    public ResponseEntity<ResponseDto<Boolean>> existsVote(@PathVariable Long groupId) {
        ResponseDto<Boolean> response = voteService.existsVote(groupId);
        HttpStatus status = response.isResult() ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
        return ResponseEntity.status(status).body(response);
    }
}