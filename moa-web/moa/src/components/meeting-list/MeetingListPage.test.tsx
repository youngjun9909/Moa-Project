import { act, render, renderHook, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import { MeetingListPage } from "./MeetingListPage";
import { useMeetingList } from "./useMeetingList";

jest.mock("axios", () => ({
  __esModule: true,
  default: { get: jest.fn(), post: jest.fn(), delete: jest.fn() },
}));
const mockedAxios = axios as jest.Mocked<typeof axios>;

const group = {
  groupId: 1,
  creatorId: "moa",
  groupTitle: "주말 산책 모임",
  groupContent: "같이 걸어요",
  groupAddress: "서울 마포구",
  groupImage: null,
  groupSupplies: "운동화",
  groupDate: "2026-10-01",
  groupQuestion: "",
  groupCategory: "취미" as const,
  groupType: "단기모임" as const,
  meetingType: "오프라인" as const,
};

describe("useMeetingList", () => {
  beforeEach(() => mockedAxios.get.mockReset());

  test("requests twelve items and normalizes array responses", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { data: [group] } });
    const { result } = renderHook(() => useMeetingList({ apiUrl: "/groups", params: { region: "서울" } }));

    await waitFor(() => expect(result.current.status).toBe("success"));
    expect(mockedAxios.get).toHaveBeenCalledWith("/groups", {
      params: { page: 1, limit: 12, sortBy: "default", region: "서울" },
    });
    expect(result.current.data).toEqual([group]);
    expect(result.current.totalPages).toBe(1);
  });

  test("normalizes page responses and resets to page one after sorting", async () => {
    mockedAxios.get
      .mockResolvedValueOnce({ data: { data: { data: [group], totalPages: 4, totalElements: 37 } } })
      .mockResolvedValueOnce({ data: { data: { data: [group], totalPages: 4, totalElements: 37 } } })
      .mockResolvedValueOnce({ data: { data: { data: [group], totalPages: 4, totalElements: 37 } } });
    const { result } = renderHook(() => useMeetingList({ apiUrl: "/groups" }));
    await waitFor(() => expect(result.current.totalElements).toBe(37));

    act(() => result.current.setPage(3));
    await waitFor(() => expect(mockedAxios.get).toHaveBeenLastCalledWith("/groups", { params: expect.objectContaining({ page: 3 }) }));
    act(() => result.current.setSort("recent"));
    await waitFor(() => expect(mockedAxios.get).toHaveBeenLastCalledWith("/groups", { params: expect.objectContaining({ page: 1, sortBy: "recent" }) }));
    expect(result.current.page).toBe(1);
  });
});

describe("MeetingListPage", () => {
  beforeEach(() => mockedAxios.get.mockReset());

  test("shows a dedicated empty state", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { data: [] } });
    render(<MemoryRouter><MeetingListPage title="전체 모임" apiUrl="/groups" /></MemoryRouter>);
    expect(await screen.findByRole("status", { name: "빈 결과" })).toBeInTheDocument();
  });

  test("shows a dedicated error state", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("network"));
    render(<MemoryRouter><MeetingListPage title="전체 모임" apiUrl="/groups" /></MemoryRouter>);
    expect(await screen.findByRole("alert", { name: "요청 오류" })).toBeInTheDocument();
  });
});
