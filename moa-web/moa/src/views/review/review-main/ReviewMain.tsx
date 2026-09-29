/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import * as s from "./style";
import img from "../../../images/moaLogo.png";
import { Review } from "../../../types";
import { format } from "date-fns";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CREATE_REVIEW_GET_API, CREATE_REVIEW_IMG_API } from "../../../apis";
import { EmptyState } from "../../../components/ui/EmptyState";

export default function ReviewMain() {
  const [reviewData, setReviewData] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      if (loading) return;

      setLoading(true);
      try {
        const response = await axios.get(CREATE_REVIEW_GET_API, {
          params: { page, size: 5 },
        });

        setReviewData((prev) => {
          const newData = [...prev, ...response.data.data];
          const uniqueData = Array.from(
            new Set(newData.map((item) => item.reviewId))
          ).map((id) => newData.find((item) => item.reviewId === id));
          return uniqueData;
        });

        setHasMore(response.data.data.length === 5);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [page]);

  const handlePostReviewPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/review/create");
  };

  return (
    <div css={s.fullBox}>
      <div css={s.header}>
        <div>
          <div>
            <span>MOA STORY</span>
            <h1>모임 후기</h1>
            <p>함께한 순간과 솔직한 경험을 나눠보세요.</p>
          </div>
          <button onClick={handlePostReviewPage}>후기 작성</button>
        </div>
      </div>

      <div css={s.mainBox}>
        {!loading && reviewData.length === 0 && (
          <EmptyState title="아직 등록된 후기가 없어요" description="첫 번째 모임 후기를 남겨보세요." />
        )}
        <div css={s.reviewGrid}>
        {reviewData.map((review) => (
          <div css={s.reviewBox} key={review.reviewId}>
            <div css={s.reviewHeader}>
              <p>{review.userId}</p>
                <time dateTime={String(review.reviewDate)}>{format(review.reviewDate, "yyyy.MM.dd")}</time>
            </div>

            <div css={s.reviewMain}>
              <div css={s.imgBox}>
                <div>
                  {review.reviewImage ? (
                    <img
                      src={`${CREATE_REVIEW_IMG_API}${review.reviewImage}`}
                      alt={`${review.groupName} 후기`}
                    />
                  ) : (
                    <img src={img} alt="MOA 기본 이미지" className="default" />
                  )}
                </div>
              </div>

              <div css={s.contentBox}>
                <div>
                  <p>{review.groupName}</p>
                </div>

                <div>
                  <p>{review.reviewContent}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
        </div>
        {reviewData.length > 0 && hasMore && (
          <button css={s.loadMore} type="button" disabled={loading} onClick={() => setPage((current) => current + 1)}>
            {loading ? "불러오는 중..." : "더 보기"}
          </button>
        )}
      </div>
    </div>
  );
}
