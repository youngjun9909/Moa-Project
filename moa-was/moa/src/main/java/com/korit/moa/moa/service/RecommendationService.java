package com.korit.moa.moa.service;

import com.korit.moa.moa.dto.ResponseDto;
import com.korit.moa.moa.dto.recommendation.request.RequestRecommendationDto;
import com.korit.moa.moa.dto.recommendation.response.GetResponseRecommendationDto;
import com.korit.moa.moa.dto.recommendation.response.ResponseRecommendationDto;

import java.util.List;

public interface RecommendationService {

    ResponseDto<ResponseRecommendationDto> createRecommendation(String userId, RequestRecommendationDto dto);

    ResponseDto<Void> deleteRecommendation(String userId, RequestRecommendationDto dto);

    ResponseDto<List<GetResponseRecommendationDto>> getRecommendation(String userId);
}
