import { GROUP_TYPE_API } from "../../apis";
import { MeetingListPage } from "../../components/meeting-list/MeetingListPage";

function RegularGroup() {
  return <MeetingListPage eyebrow="GROW TOGETHER" title="정기 모임" description="꾸준히 만나며 취향과 관계를 깊게 이어갈 모임을 둘러보세요." apiUrl={GROUP_TYPE_API} params={{ groupType: "정기모임" }} emptyCopy={{ title: "진행 중인 정기 모임이 없어요", description: "오래 함께할 정기 모임을 직접 시작해보세요." }} />;
}
export default RegularGroup;
