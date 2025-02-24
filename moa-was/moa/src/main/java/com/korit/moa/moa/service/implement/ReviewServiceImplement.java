package com.korit.moa.moa.service.implement;

import com.korit.moa.moa.common.constant.ResponseMessage;
import com.korit.moa.moa.dto.ResponseDto;
import com.korit.moa.moa.dto.review.request.CreateRequestDto;
import com.korit.moa.moa.dto.review.request.UpdateRequestDto;
import com.korit.moa.moa.dto.review.response.ReviewResponseDto;
import com.korit.moa.moa.entity.review.Review;
import com.korit.moa.moa.repository.ReviewRepository;
import com.korit.moa.moa.service.ImgFileService;
import com.korit.moa.moa.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewServiceImplement implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final ImgFileService imgFileService;

    @Override
    public ResponseDto<ReviewResponseDto> createReview(String userId, CreateRequestDto dto) {
        ReviewResponseDto data = null;
        Long groupId = dto.getGroupId();
        String groupName = dto.getGroupName();
        String reviewContent = dto.getReviewContent();
        LocalDate reviewDate = LocalDate.now();

        String reviewImgPath = null;

        if (dto.getReviewImage() != null && !dto.getReviewImage().isEmpty()) {
            reviewImgPath = imgFileService.convertImgFile(dto.getReviewImage(), "reviewImg");
        }

        try{
            Review review = Review.builder()
                    .groupId(groupId)
                    .groupName(groupName)
                    .userId(userId)
                    .reviewContent(reviewContent)
                    .reviewImage(reviewImgPath)
                    .reviewDate(String.valueOf(reviewDate))
                    .build();
            reviewRepository.save(review);

            data = new ReviewResponseDto(review);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }
        return ResponseDto.setSuccess(ResponseMessage.SUCCESS, data);
    }

    @Override
    public ResponseDto<ReviewResponseDto> getReviewById(Long reviewId) {
        ReviewResponseDto data = null;

        try{
            Optional<Review> optionalReview = reviewRepository.findById(reviewId);
            if(optionalReview.isEmpty()) {
                return ResponseDto.setFailed(ResponseMessage.NOT_EXIST_DATA);
            }

            Review review = optionalReview.get();
            data = new ReviewResponseDto(review);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }
        return ResponseDto.setSuccess(ResponseMessage.SUCCESS, data);
    }

    @Override
    public ResponseDto<List<ReviewResponseDto>> getMyReviews(String userId) {
        List<ReviewResponseDto> data = null;

        try{
            List<Review> reviews  = reviewRepository.findAllByUserId(userId);
            data = reviews.stream()
                    .map(ReviewResponseDto :: new)
                    .collect(Collectors.toList());

            if(data == null || data.isEmpty()) {
                return ResponseDto.setSuccess(ResponseMessage.NOT_EXIST_DATA, data);
            }

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }
        return ResponseDto.setSuccess(ResponseMessage.SUCCESS, data);
    }

    @Override
    public ResponseDto<ReviewResponseDto> updateReview(Long reviewId, String userId, UpdateRequestDto dto) {
        ReviewResponseDto data = null;

        try{
            Optional<Review> optionalReview = reviewRepository.findById(reviewId);
            if(optionalReview.isEmpty()) {
                return ResponseDto.setFailed(ResponseMessage.NOT_EXIST_DATA);
            }

            Review review = optionalReview.get();

            if(!review.getUserId().equals(userId)) {
                return ResponseDto.setFailed(ResponseMessage.NO_PERMISSION);
            }

            review = Review.builder()
                    .reviewId(review.getReviewId())
                    .groupId(review.getReviewId())
                    .userId(review.getUserId())
                    .reviewContent(dto.getReviewContent())
                    .reviewImage(dto.getReviewImage())
                    .reviewDate(review.getReviewDate())
                    .build();

            reviewRepository.save(review);
            data = new ReviewResponseDto(review);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }
        return ResponseDto.setSuccess(ResponseMessage.SUCCESS, data);
    }

    @Override
    public ResponseDto<Void> deleteReview(Long reviewId, String userId) {
        try{
            Optional<Review> optionalReview = reviewRepository.findById(reviewId);
            if(optionalReview.isEmpty()) {
                return ResponseDto.setFailed(ResponseMessage.NOT_EXIST_DATA);
            }

            Review deleteReview = optionalReview.get();

            if(!deleteReview.getUserId().equals(userId)) {
                return ResponseDto.setFailed(ResponseMessage.NO_PERMISSION);
            }

            reviewRepository.deleteById(reviewId);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        };
        return ResponseDto.setSuccess(ResponseMessage.SUCCESS, null);
    }

    @Override
    public ResponseDto<List<ReviewResponseDto>> getAllReviews(int page, int size) {
        List<ReviewResponseDto> data;

        try {
            Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "reviewDate"));
            Page<Review> reviews = reviewRepository.findAll(pageable);

            data = reviews.stream()
                    .map(ReviewResponseDto::new)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed(ResponseMessage.DATABASE_ERROR);
        }

        return ResponseDto.setSuccess(ResponseMessage.SUCCESS, data);
    }

}