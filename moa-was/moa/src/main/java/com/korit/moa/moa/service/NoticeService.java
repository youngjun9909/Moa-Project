package com.korit.moa.moa.service;

import com.korit.moa.moa.dto.ResponseDto;
import com.korit.moa.moa.dto.notice.response.NoticeResponseDto;

import java.util.List;

public interface NoticeService {

    ResponseDto<List<NoticeResponseDto>> getAllNotice();
}
