/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { BsCalendar3, BsGeoAlt, BsHeart, BsHeartFill } from "react-icons/bs";
import { MeetingGroup } from "../../types";
import { PAGINATION_GROUP_IMG_API, PAGINATION_RECOMMENDATION_DELETE_API, PAGINATION_RECOMMENDATION_GET_API, PAGINATION_RECOMMENDATION_POST_API } from "../../apis";
import groupFallback from "../../images/moaLogo.png";
import * as s from "./style";

interface MeetingCardProps { group: MeetingGroup; }
export function MeetingCard({ group }: MeetingCardProps) {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);
  const [liked, setLiked] = useState(false);
  const [imageSrc, setImageSrc] = useState(group.groupImage ? `${PAGINATION_GROUP_IMG_API}${group.groupImage}` : groupFallback);

  useEffect(() => {
    if (!cookies.token) return;
    let active = true;
    axios.get(PAGINATION_RECOMMENDATION_GET_API, { headers: { Authorization: `Bearer ${cookies.token}` }, withCredentials: true })
      .then(response => { if (active) setLiked(response.data?.data?.some((item: { groupId: number }) => item.groupId === group.groupId)); })
      .catch(() => undefined);
    return () => { active = false; };
  }, [cookies.token, group.groupId]);

  const openGroup = () => navigate(`/meeting-group/${group.groupId}`);
  const toggleLike = async () => {
    if (!cookies.token) { window.alert("로그인 후 사용가능합니다."); return; }
    try {
      if (liked) await axios.delete(PAGINATION_RECOMMENDATION_DELETE_API, { data: { groupId: group.groupId }, headers: { Authorization: `Bearer ${cookies.token}` }, withCredentials: true });
      else await axios.post(PAGINATION_RECOMMENDATION_POST_API, { groupId: group.groupId }, { headers: { Authorization: `Bearer ${cookies.token}` }, withCredentials: true });
      setLiked(value => !value);
    } catch { window.alert("관심 모임 저장에 실패했어요. 잠시 후 다시 시도해주세요."); }
  };

  return (
    <article css={s.card}>
      <button type="button" css={s.imageButton} onClick={openGroup} aria-label={`${group.groupTitle} 상세 보기`}>
        <img css={s.image} src={imageSrc} alt="" onError={() => setImageSrc(groupFallback)} />
        <span css={s.badge}>{group.groupType}</span>
      </button>
      <div css={s.body}>
        <div css={s.titleRow}>
          <button type="button" css={s.titleButton} onClick={openGroup}>{group.groupTitle}</button>
          <button type="button" css={s.heart} aria-label={liked ? "관심 모임에서 제거" : "관심 모임에 추가"} aria-pressed={liked} onClick={toggleLike}>{liked ? <BsHeartFill /> : <BsHeart />}</button>
        </div>
        <div css={s.meta}>
          <div css={s.metaRow}><BsCalendar3 aria-hidden="true" /><span>{group.groupDate || "일정 협의"}</span></div>
          <div css={s.metaRow}><BsGeoAlt aria-hidden="true" /><span>{group.groupAddress || group.meetingType}</span></div>
        </div>
      </div>
    </article>
  );
}
