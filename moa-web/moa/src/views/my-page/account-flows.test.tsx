import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import MyPageStart from "./get-user-info/MyPageStart";
import MyPageReview from "./mypage-review/MyPageReview";
import SignUp from "../auth/signup/SignUp";

jest.mock("axios", () => ({ get: jest.fn(), post: jest.fn(), delete: jest.fn() }));
jest.mock("react-cookie", () => ({ useCookies: () => [{ token: "test-token" }] }));
const client = axios as jest.Mocked<typeof axios>;

beforeEach(() => jest.clearAllMocks());

test("signup reports a hobby request failure without crashing the page", async () => {
  client.get.mockRejectedValue(new Error("offline"));
  render(<MemoryRouter><SignUp /></MemoryRouter>);
  expect(await screen.findByRole("alert")).toHaveTextContent("취미 목록");
  expect(screen.getByRole("heading", { name: "회원가입" })).toBeInTheDocument();
});

test("account verification keeps empty passwords on the page with an inline error", () => {
  render(<MemoryRouter><MyPageStart /></MemoryRouter>);
  fireEvent.click(screen.getByRole("button", { name: "내 정보 수정" }));
  expect(screen.getByRole("alert")).toHaveTextContent("비밀번호를 입력해주세요");
  expect(client.post).not.toHaveBeenCalled();
});

test("my reviews exposes an action to discover meetings when the list is empty", async () => {
  client.get.mockResolvedValue({ data: { data: [] } });
  render(<MemoryRouter><MyPageReview /></MemoryRouter>);
  expect(await screen.findByRole("heading", { name: "아직 작성한 후기가 없어요" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "모임 둘러보기" })).toBeInTheDocument();
});

test("my reviews shows loading rather than a false empty result while fetching", () => {
  client.get.mockReturnValue(new Promise(() => {}));
  render(<MemoryRouter><MyPageReview /></MemoryRouter>);
  expect(screen.getByRole("status", { name: "로딩 중" })).toBeInTheDocument();
  expect(screen.queryByText("아직 작성한 후기가 없어요")).not.toBeInTheDocument();
});
