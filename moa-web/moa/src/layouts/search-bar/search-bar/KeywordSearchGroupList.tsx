import { useParams } from "react-router-dom";
import { KEYWORD_LIST_API } from "../../../apis";
import { MeetingListPage } from "../../../components/meeting-list/MeetingListPage";

function KeywordSearchGroupList() {
  const { keyword = "" } = useParams<{ keyword: string }>();
  const decodedKeyword = decodeURIComponent(keyword);
  return <MeetingListPage eyebrow="SEARCH RESULTS" title={`‘${decodedKeyword}’ 검색 결과`} description="검색어와 관련된 모임을 최신 정보로 보여드려요." apiUrl={KEYWORD_LIST_API} params={{ keyword: decodedKeyword }} emptyCopy={{ title: "검색 결과가 없어요", description: "다른 관심사나 지역 이름으로 다시 검색해보세요." }} />;
}
export default KeywordSearchGroupList;
