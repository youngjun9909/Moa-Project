/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GROUP_DETAIL_MEETING_API, PAGINATION_RECOMMENDATION_GET_API } from "../../../apis";
import { MeetingGroup } from "../../../types";
import { AsyncState, Button, PageHeader, Pagination } from "../../../components/ui";
import { MeetingCard } from "../../../components/meeting-list/MeetingCard";
import * as s from "../../../components/meeting-list/style";

export default function FavoriteMeetings() {
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const [groups, setGroups] = useState<MeetingGroup[]>([]);
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [retry, setRetry] = useState(0);
  const [unavailable, setUnavailable] = useState(0);
  useEffect(() => {
    let active = true;
    setStatus("loading");
    async function load() {
      try {
        const response = await axios.get(PAGINATION_RECOMMENDATION_GET_API, {headers:{Authorization:`Bearer ${cookies.token}`},withCredentials:true});
        const ids = Array.from(new Set<number>((response.data.data || []).map((item:{groupId:number}) => item.groupId)));
        if (!active) return;
        setTotal(ids.length);
        const lastPage = Math.max(1, Math.ceil(ids.length / 12));
        if (page > lastPage) { setPage(lastPage); return; }
        const details = await Promise.all(ids.slice((page-1)*12,page*12).map(async id => {
          try {
            const detail = await axios.get(`${GROUP_DETAIL_MEETING_API}${id}`);
            return (detail.data.data || null) as MeetingGroup | null;
          } catch (error) {
            const response = (error as {response?:{status:number;data?:{message?:string}}}).response;
            if (response?.status === 404 ||
                (response?.status === 400 && response.data?.message === "Data does not exist.")) return null;
            throw error;
          }
        }));
        if (!active) return;
        setGroups(details.filter((item): item is MeetingGroup => item !== null));
        setUnavailable(details.filter(item => item === null).length);
        setStatus("success");
      } catch { if (active) setStatus("error"); }
    }
    void load();
    return () => { active = false; };
  }, [cookies.token, page, retry]);
  return <main css={s.page}>
    <PageHeader eyebrow="SAVED FOR LATER" title="관심 모임" description="마음에 담아둔 모임을 모아보고, 함께할 다음 약속을 찾아보세요." />
    {status === "success" && <p>{total}개의 관심 모임</p>}
    {status === "success" && unavailable > 0 && <p role="status">이 페이지의 모임 {unavailable}개는 삭제되어 표시할 수 없어요.</p>}
    <section css={s.results} aria-label="관심 모임 목록">
      <AsyncState status={status === "success" && !total ? "empty" : status}
        empty={{title:"아직 관심 모임이 없어요",description:"마음에 드는 모임의 하트를 눌러 저장해보세요.",action:<Button onClick={() => navigate('/main')}>모임 둘러보기</Button>}}
        error={{title:"관심 모임을 불러오지 못했어요",description:"연결 상태를 확인한 뒤 다시 시도해주세요.",action:<Button onClick={() => setRetry(value=>value+1)}>다시 시도</Button>}}>
        <div css={s.grid}>{groups.map(group => <MeetingCard key={group.groupId} group={group} initialLiked onLikeChange={() => setRetry(value=>value+1)} />)}</div>
      </AsyncState>
    </section>
    {status === "success" && <Pagination page={page} totalPages={Math.ceil(total/12)} onChange={setPage} />}
  </main>;
}
