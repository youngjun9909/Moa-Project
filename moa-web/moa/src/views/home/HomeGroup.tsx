/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router-dom";
import { CATEGORY_GET_API } from "../../apis";
import { MeetingListPage } from "../../components/meeting-list/MeetingListPage";
import { Button } from "../../components/ui";
import * as s from "./style";

function HomeGroup() {
  const navigate = useNavigate();
  const filters = <nav css={s.filterBar} aria-label="모임 유형"><Button variant="primary" onClick={() => navigate("/main")}>전체</Button><Button variant="secondary" onClick={() => navigate("/main/grouptype/shorttype")}>단기 모임</Button><Button variant="secondary" onClick={() => navigate("/main/grouptype/regulartype")}>정기 모임</Button></nav>;
  return <MeetingListPage eyebrow="DISCOVER TOGETHER" title="전체 모임" description="취향과 지역이 맞는 모임을 한눈에 둘러보고 오늘의 만남을 시작해보세요." apiUrl={CATEGORY_GET_API} filters={filters} emptyCopy={{ title: "아직 등록된 모임이 없어요", description: "새로운 사람들과 함께할 첫 번째 모임을 만들어보세요.", action: <Button onClick={() => navigate("/main/create-group")}>모임 만들기</Button> }} />;
}
export default HomeGroup;
