/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import * as s from "./style";
import img from "../../../images/moaLogo.png";
import { Review } from "../../../types";
import { format } from "date-fns";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CREATE_REVIEW_GET_API, CREATE_REVIEW_IMG_API } from "../../../apis";
import { Button } from "../../../components/ui";
import { EmptyState } from "../../../components/ui/EmptyState";

export default function ReviewMain() {
  const [reviewData, setReviewData] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [retry, setRetry] = useState(0);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    const fetchReviews = async () => {
      setLoading(true);
      setFailed(false);
      try {
        const response = await axios.get(CREATE_REVIEW_GET_API, {
          params: { page, size: 5 },
        });

        if (!active) return;
        setReviewData((prev) => {
          const newData = [...prev, ...response.data.data];
          const uniqueData = Array.from(
            new Set(newData.map((item) => item.reviewId))
          ).map((id) => newData.find((item) => item.reviewId === id));
          return uniqueData;
        });

        setHasMore(response.data.data.length === 5);
      } catch (error) {
        if (active) setFailed(true);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchReviews();
    return () => { active = false; };
  }, [page, retry]);

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
        {failed && <div role="alert" css={s.emptyWrap}><EmptyState title="후기를 불러오지 못했어요" description="연결을 확인한 뒤 다시 시도해주세요." action={<Button onClick={() => setRetry(value => value + 1)}>다시 시도</Button>} /></div>}
        {loading && <p role="status">후기를 불러오는 중이에요…</p>}
        {!loading && !failed && reviewData.length === 0 && (
          <div css={s.emptyWrap}>
            <EmptyState
              title="아직 등록된 후기가 없어요"
              description="함께한 모임의 기억과 유용한 팁을 첫 번째로 들려주세요."
              action={<Button onClick={() => navigate("/review/create")}>첫 후기 작성하기</Button>}
            />
          </div>
        )}
        <div css={s.reviewGrid}>
        {reviewData.map((review) => (
          <article css={s.reviewBox} key={review.reviewId}>
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
                <div css={s.reviewHeader}>
                  <span>{review.userId}</span>
                  <time dateTime={String(review.reviewDate)}>{format(review.reviewDate, "yyyy.MM.dd")}</time>
                </div>
                <h2>{review.groupName}</h2>
                <p>{review.reviewContent}</p>
              </div>
            </div>
          </article>
        ))}
        </div>
        {reviewData.length > 0 && hasMore && !failed && (
          <button css={s.loadMore} type="button" disabled={loading} onClick={() => setPage((current) => current + 1)}>
            {loading ? "불러오는 중..." : "더 보기"}
          </button>
        )}
      </div>
    </div>
  );
}
