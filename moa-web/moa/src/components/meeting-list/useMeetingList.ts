import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { MeetingGroup } from "../../types";

export type MeetingListStatus = "idle" | "loading" | "success" | "empty" | "error";
interface UseMeetingListOptions { apiUrl: string; params?: Record<string, string | number | boolean | undefined>; pageSize?: number; }
interface PagePayload { data?: MeetingGroup[]; content?: MeetingGroup[]; totalPages?: number; totalElements?: number; }

function normalizePayload(payload: MeetingGroup[] | PagePayload | null | undefined) {
  if (Array.isArray(payload)) return { data: payload, totalPages: 1, totalElements: payload.length };
  const data = payload?.data || payload?.content || [];
  return {
    data,
    totalPages: Math.max(1, payload?.totalPages || 1),
    totalElements: payload?.totalElements ?? data.length,
  };
}

export function useMeetingList({ apiUrl, params = {}, pageSize = 12 }: UseMeetingListOptions) {
  const [data, setData] = useState<MeetingGroup[]>([]);
  const [status, setStatus] = useState<MeetingListStatus>("idle");
  const [page, setPage] = useState(1);
  const [sort, setSortValue] = useState("default");
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [reloadKey, setReloadKey] = useState(0);
  const paramsKey = useMemo(() => JSON.stringify(params), [params]);
  const previousQuery = useRef(`${apiUrl}:${paramsKey}`);

  const setSort = useCallback((nextSort: string) => {
    setPage(1);
    setSortValue(nextSort);
  }, []);
  const reload = useCallback(() => setReloadKey(value => value + 1), []);

  useEffect(() => {
    const queryKey = `${apiUrl}:${paramsKey}`;
    if (previousQuery.current !== queryKey) {
      previousQuery.current = queryKey;
      if (page !== 1) { setPage(1); return; }
    }

    let active = true;
    setStatus("loading");
    axios.get(apiUrl, { params: { page, limit: pageSize, sortBy: sort, ...params } })
      .then(response => {
        if (!active) return;
        const normalized = normalizePayload(response.data?.data);
        setData(normalized.data);
        setTotalPages(normalized.totalPages);
        setTotalElements(normalized.totalElements);
        setStatus(normalized.data.length ? "success" : "empty");
      })
      .catch(() => {
        if (!active) return;
        setData([]);
        setTotalPages(1);
        setTotalElements(0);
        setStatus("error");
      });
    return () => { active = false; };
    // paramsKey deliberately represents the serialized primitive query.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiUrl, page, pageSize, paramsKey, sort, reloadKey]);

  return { data, status, page, totalPages, totalElements, sort, setPage, setSort, reload };
}
