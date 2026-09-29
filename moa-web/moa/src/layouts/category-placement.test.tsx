import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MainContainer from "./main-container/MainContainer";
import SearchBarRoutes from "./search-bar";
import useCategoryBarStore from "../stores/categoryBar.store";
import axios from "axios";

jest.mock("axios", () => ({ get: jest.fn(), post: jest.fn() }));

describe("category filter placement", () => {
  beforeEach(() => {
    useCategoryBarStore.setState({ isOpen: true });
    (axios.get as jest.Mock).mockResolvedValue({ data: { data: { data: [], totalPages: 1 } } });
  });

  test("does not render the category filter in ordinary workspace content", () => {
    render(<MemoryRouter><MainContainer><main>홈 콘텐츠</main></MainContainer></MemoryRouter>);
    expect(screen.queryByText("카테고리")).not.toBeInTheDocument();
  });

  test("renders the category filter inside the search workspace", () => {
    render(<MemoryRouter initialEntries={["/"]}><SearchBarRoutes /></MemoryRouter>);
    expect(screen.getByText("카테고리")).toBeInTheDocument();
    expect(screen.getByText("지역")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "전체 모임" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "검색" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "카테고리 필터 닫기" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "상세 필터 열기" })).not.toBeInTheDocument();
    expect(screen.queryByRole("searchbox")).not.toBeInTheDocument();
  });

  test("shows a complete empty state and lets users reset an active filter", async () => {
    render(<MemoryRouter initialEntries={["/"]}><SearchBarRoutes /></MemoryRouter>);

    expect(await screen.findByRole("heading", { name: "아직 등록된 모임이 없어요" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "첫 모임 만들기" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "취미" }));
    expect(await screen.findByRole("heading", { name: "선택한 조건의 모임이 없어요" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "필터 초기화" }));

    await waitFor(() => expect(screen.getByRole("button", { name: "취미" })).toHaveAttribute("aria-pressed", "false"));
  });
});
