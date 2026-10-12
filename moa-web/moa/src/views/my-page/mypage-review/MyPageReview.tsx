/** @jsxImportSource @emotion/react */
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as s from "./style";
import { Review } from "../../../types";
import img from "../../../images/moaLogo.png";
import axios from "axios";
import { useCookies } from "react-cookie";
import { REVIEW_DELETE_API, REVIEW_GET_API, REVIEW_IMG_API } from "../../../apis";
import { PageHeader, Button, AsyncState } from "../../../components/ui";
import { AccountNav } from "../AccountNav";

export default function MyPageReview() {
  const [reviewData, setReviewData] = useState<Review[]>([]);
  const [status, setStatus] = useState<"loading" | "error" | "success">("loading");
  const [notice, setNotice] = useState("");
  const [deleting, setDeleting] = useState<number | null>(null);
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const load = useCallback(async () => {
    setStatus("loading");
    try {
      const response = await axios.get(REVIEW_GET_API, { headers: { Authorization: `Bearer ${cookies.token}` } });
      setReviewData(response.data.data || []); setStatus("success");
    } catch { setStatus("error"); }
  }, [cookies.token]);
  useEffect(() => { void load(); }, [load]);

  const handleDeleteReview = async (reviewId: number) => {
    if (!window.confirm("이 후기를 삭제할까요? 삭제한 후기는 복구할 수 없어요.")) return;
    setDeleting(reviewId); setNotice("");
    try {
      const response = await axios.delete(`${REVIEW_DELETE_API}${reviewId}`, { headers: { Authorization: `Bearer ${cookies.token}` } });
      if (!response.data.result) throw new Error("delete failed");
      setReviewData(previous => previous.filter(review => review.reviewId !== reviewId));
      setNotice("후기를 삭제했어요.");
    } catch { setNotice("삭제하지 못했어요. 잠시 후 다시 시도해주세요."); }
    finally { setDeleting(null); }
  };

  return <main css={s.fullBox}>
    <PageHeader eyebrow="MY STORIES" title="내 후기 관리" description="함께했던 순간과 내가 남긴 이야기를 모아봤어요." actions={<Button onClick={() => navigate("/review/create")}>＋ 후기 작성</Button>} />
    <AccountNav />
    <div css={s.summary}><strong>내가 남긴 후기</strong>{status === "success" && <span>{reviewData.length}개의 이야기</span>}</div>
    {notice && <p css={s.notice} role="status">{notice}</p>}
    <AsyncState status={status === "success" && !reviewData.length ? "empty" : status}
      empty={{ title:"아직 작성한 후기가 없어요", description:"새로운 사람들과 함께한 경험을 나만의 이야기로 남겨보세요.", action:<Button onClick={() => navigate("/main")}>모임 둘러보기</Button> }}
      error={{ title:"후기를 불러오지 못했어요", description:"연결 상태를 확인한 뒤 다시 시도해주세요.", action:<Button onClick={load}>다시 시도</Button> }}>
      <div css={s.mainBox}>{reviewData.map(review => <article css={s.reviewBox} key={review.reviewId}>
        <img css={s.cover} src={review.reviewImage ? `${REVIEW_IMG_API}${review.reviewImage}` : img} alt={review.groupName + " 후기"} data-fallback={!review.reviewImage} />
        <div css={s.contentBox}><div css={s.meta}><span>나의 모임 기록</span><Button variant="destructive" disabled={deleting !== null} onClick={() => handleDeleteReview(review.reviewId!)}>{deleting === review.reviewId ? "삭제 중…" : "삭제"}</Button></div><h2>{review.groupName}</h2><p>{review.reviewContent}</p></div>
      </article>)}</div>
    </AsyncState>
  </main>;
}
