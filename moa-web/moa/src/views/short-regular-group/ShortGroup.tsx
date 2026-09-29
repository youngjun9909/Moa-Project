import { GROUP_TYPE_API } from "../../apis";
import { MeetingListPage } from "../../components/meeting-list/MeetingListPage";

function ShortGroup() {
  return <MeetingListPage eyebrow="QUICK MEETUPS" title="단기 모임" description="가볍게 시작하고 바로 함께할 수 있는 모임을 찾아보세요." apiUrl={GROUP_TYPE_API} params={{ groupType: "단기모임" }} emptyCopy={{ title: "진행 중인 단기 모임이 없어요", description: "새로운 단기 모임을 직접 시작해보세요." }} />;
}
export default ShortGroup;
