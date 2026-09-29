import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import HomeGroup from "./home/HomeGroup";
import ShortGroup from "./short-regular-group/ShortGroup";
import RegularGroup from "./short-regular-group/RegularGroup";
import KeywordSearchGroupList from "../layouts/search-bar/search-bar/KeywordSearchGroupList";
import CategorySearchList from "../layouts/search-bar/category-bar/CategorySearchList";
import SearchBarRoutes from "../layouts/search-bar";

jest.mock("axios", () => ({ __esModule: true, default: { get: jest.fn(), post: jest.fn(), delete: jest.fn() } }));
const mockedAxios = axios as jest.Mocked<typeof axios>;

const makeGroup = (id: number) => ({
  groupId: id, creatorId: "moa", groupTitle: `모임 ${id}`, groupContent: "함께해요",
  groupAddress: "서울 마포구", groupImage: null, groupSupplies: "", groupDate: "2026-10-01",
  groupQuestion: "", groupCategory: "취미" as const, groupType: "단기모임" as const, meetingType: "오프라인" as const,
});

function mockGroups(count = 2) {
  mockedAxios.get.mockResolvedValue({ data: { data: { data: Array.from({ length: count }, (_, index) => makeGroup(index + 1)), totalPages: 2, totalElements: 15 } } });
}

describe("meeting discovery routes", () => {
  beforeEach(() => mockedAxios.get.mockReset());

  test.each([
    ["홈", <HomeGroup />, "전체 모임"],
    ["단기", <ShortGroup />, "단기 모임"],
    ["정기", <RegularGroup />, "정기 모임"],
  ])("%s 화면이 공통 목록 제목을 사용한다", async (_name, component, heading) => {
    mockGroups();
    render(<MemoryRouter>{component}</MemoryRouter>);
    expect(await screen.findByRole("heading", { level: 1, name: heading })).toBeInTheDocument();
  });

  test("키워드 검색 화면은 검색어를 제목에 표시한다", async () => {
    mockGroups();
    render(<MemoryRouter initialEntries={["/searchresult/러닝"]}><Routes><Route path="/searchresult/:keyword" element={<KeywordSearchGroupList />} /></Routes></MemoryRouter>);
    expect(await screen.findByRole("heading", { level: 1, name: /러닝/ })).toBeInTheDocument();
  });

  test("키워드 검색 결과에는 카테고리 필터를 중복 노출하지 않는다", async () => {
    mockGroups();
    render(<MemoryRouter initialEntries={["/searchresult/러닝"]}><SearchBarRoutes /></MemoryRouter>);
    expect(await screen.findByRole("heading", { level: 1, name: /러닝/ })).toBeInTheDocument();
    expect(screen.queryByText("카테고리")).not.toBeInTheDocument();
  });

  test("카테고리 화면은 선택 조건을 요청하고 12개 카드만 배치한다", async () => {
    mockGroups(13);
    render(<MemoryRouter><CategorySearchList groupCategory="취미" region="서울" /></MemoryRouter>);
    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledWith(expect.any(String), { params: expect.objectContaining({ groupCategory: "취미", region: "서울", limit: 12 }) }));
    expect(await screen.findAllByRole("article")).toHaveLength(12);
    expect(screen.getAllByRole("img")[0]).toHaveAttribute("src", expect.stringContaining("moaLogo"));
  });
});
