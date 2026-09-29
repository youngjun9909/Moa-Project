import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import CreateGroup from "./group-detail/create-group/CreateGroup";
import ReviewMain from "./review/review-main/ReviewMain";

jest.mock("axios", () => ({
  __esModule: true,
  default: { get: jest.fn(), post: jest.fn() },
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("user page visual structure", () => {
  beforeEach(() => mockedAxios.get.mockReset());

  test("meeting creation groups the first step into scannable sections", () => {
    render(<MemoryRouter><CreateGroup /></MemoryRouter>);

    expect(screen.getByRole("group", { name: "어떤 모임인가요?" })).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "언제 만나나요?" })).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "어디서 만나나요?" })).toBeInTheDocument();
  });

  test("meeting creation card titles stay inside each card as headings", () => {
    render(<MemoryRouter><CreateGroup /></MemoryRouter>);

    ["어떤 모임인가요?", "언제 만나나요?", "어디서 만나나요?"].forEach((title) => {
      const card = screen.getByRole("group", { name: title });
      expect(within(card).getByRole("heading", { name: title })).toBeInTheDocument();
    });
  });

  test("offline meeting can fill its address from Kakao postcode search", () => {
    const Postcode = jest.fn(({ oncomplete }) => ({
      open: () => oncomplete({ userSelectedType: "R", roadAddress: "서울 마포구 월드컵로 1", jibunAddress: "" }),
    }));
    (window as any).kakao = { Postcode };
    render(<MemoryRouter><CreateGroup /></MemoryRouter>);

    fireEvent.click(screen.getByRole("button", { name: "오프라인" }));
    fireEvent.click(screen.getByRole("textbox", { name: "모임 주소" }));

    expect(screen.getByRole("textbox", { name: "모임 주소" })).toHaveValue("서울 마포구 월드컵로 1");
    expect(screen.getByRole("textbox", { name: "상세 주소" })).toBeInTheDocument();
  });

  test("empty review feed keeps its primary action beside the empty-state guidance", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { data: [] } });
    render(<MemoryRouter><ReviewMain /></MemoryRouter>);

    const emptyState = await screen.findByRole("region", { name: "아직 등록된 후기가 없어요" });
    expect(emptyState).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "첫 후기 작성하기" })).toBeInTheDocument();
  });
});
