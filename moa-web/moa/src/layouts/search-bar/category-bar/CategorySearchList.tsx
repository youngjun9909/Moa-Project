/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { CATEGORY_GET_API } from "../../../apis";
import { MeetingListPage } from "../../../components/meeting-list/MeetingListPage";
import { Button } from "../../../components/ui";
import { useNavigate } from "react-router-dom";

interface CategorySearchListProps { groupCategory?: string; region?: string; onReset?: () => void; }
const selectedStyle = css`display:flex;align-items:center;flex-wrap:wrap;gap:7px; span{padding:7px 10px;border:1px solid var(--moa-chip-line);border-radius:999px;background:var(--moa-chip-bg);color:var(--moa-chip-ink);font-size:12px;font-weight:800;}`;

function CategorySearchList({ groupCategory = "", region = "", onReset }: CategorySearchListProps) {
  const navigate = useNavigate();
  const filtered = Boolean(groupCategory || region);
  const selected = filtered ? <div css={selectedStyle} aria-label="선택한 필터">{groupCategory && <span>{groupCategory}</span>}{region && <span>{region}</span>}{onReset && <Button variant="ghost" onClick={onReset}>필터 초기화</Button>}</div> : undefined;
  return <MeetingListPage eyebrow="BROWSE BY CATEGORY" title={filtered ? "필터링된 모임" : "전체 모임"} description={filtered ? "선택한 관심 분야와 지역에 맞는 모임이에요." : "처음에는 모든 모임을 보여드리고, 선택 즉시 목록을 좁혀드려요."} apiUrl={CATEGORY_GET_API} params={{ ...(groupCategory ? { groupCategory } : {}), ...(region ? { region } : {}) }} filters={selected} emptyCopy={{ title: filtered ? "선택한 조건의 모임이 없어요" : "아직 등록된 모임이 없어요", description: filtered ? "다른 카테고리나 지역을 선택해보세요." : "첫 번째 모임을 만들어 새로운 만남을 시작해보세요.", action: filtered && onReset ? <Button variant="secondary" onClick={onReset}>다른 조건 보기</Button> : <Button onClick={() => navigate("/main/create-group")}>첫 모임 만들기</Button> }} />;
}
export default CategorySearchList;
