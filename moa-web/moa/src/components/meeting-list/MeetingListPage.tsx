/** @jsxImportSource @emotion/react */
import { ReactNode } from "react";
import { AsyncState, Pagination, ResultToolbar, SortTabs } from "../ui";
import { MeetingCard } from "./MeetingCard";
import { useMeetingList } from "./useMeetingList";
import * as s from "./style";

interface MeetingListPageProps {
  title: string;
  description?: string;
  eyebrow?: string;
  apiUrl: string;
  params?: Record<string, string | number | boolean | undefined>;
  filters?: ReactNode;
  actions?: ReactNode;
  emptyCopy?: { title?: string; description?: string; action?: ReactNode };
}
const sortOptions = [
  { value: "default", label: "기본순" },
  { value: "recent", label: "최신순" },
  { value: "past", label: "과거순" },
  { value: "recommendation", label: "추천순" },
];

export function MeetingListPage({ title, description, eyebrow, apiUrl, params, filters, actions, emptyCopy }: MeetingListPageProps) {
  const list = useMeetingList({ apiUrl, params, pageSize: 12 });
  return (
    <main css={s.page}>
      {eyebrow && <p css={s.eyebrow}>{eyebrow}</p>}
      <ResultToolbar
        title={title}
        description={description}
        count={list.totalElements}
        filters={filters}
        actions={<>{actions}<SortTabs value={list.sort} options={sortOptions} onChange={list.setSort} /></>}
      />
      <section css={s.results} aria-label="모임 목록 결과">
        <AsyncState
          status={list.status}
          empty={{ title: emptyCopy?.title || "조건에 맞는 모임이 아직 없어요", description: emptyCopy?.description || "다른 조건을 선택하거나 새로운 모임을 만들어보세요.", action: emptyCopy?.action }}
          error={{ title: "모임을 불러오지 못했어요", description: "잠시 후 다시 시도해주세요.", action: <button type="button" onClick={list.reload}>다시 불러오기</button> }}
        >
          <div css={s.grid}>{list.data.slice(0, 12).map(group => <MeetingCard key={group.groupId} group={group} />)}</div>
        </AsyncState>
      </section>
      <Pagination page={list.page} totalPages={list.totalPages} onChange={list.setPage} />
    </main>
  );
}
