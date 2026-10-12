import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import CreateGroup from "./CreateGroup";
import HomeGroup from "../../home/HomeGroup";
import { CATEGORY_GET_API } from "../../../apis";

jest.mock("axios", () => ({ get: jest.fn(), post: jest.fn(), delete: jest.fn() }));
let mockToken: string | undefined = "fixture-token";
jest.mock("react-cookie", () => ({ useCookies: () => [{ token: mockToken }] }));
const created = { groupId: 71, creatorId: "fixture", groupTitle: "새 독서 모임", groupContent: "함께 책을 읽어요", groupAddress: "온라인", groupImage: null, groupSupplies: "책", groupDate: "2026-10-20", groupQuestion: "좋아하는 책은?", groupCategory: "취미", groupType: "단기모임", meetingType: "온라인" };

beforeEach(() => {
  jest.resetAllMocks();
  mockToken = "fixture-token";
  jest.spyOn(window, "alert").mockImplementation(() => {});
  (axios.get as jest.Mock).mockImplementation((url: string) => Promise.resolve({ data: { result: true, data: url === CATEGORY_GET_API ? { data: [created], totalPages: 1, totalElements: 1 } : [] } }));
});
afterEach(() => jest.restoreAllMocks());

function renderMeeting() {
  return render(<MemoryRouter initialEntries={["/main/create-group"]}><Routes>
    <Route path="/main/create-group" element={<CreateGroup />} />
    <Route path="/main" element={<HomeGroup />} />
    <Route path="/signIn" element={<h1>로그인 페이지</h1>} />
  </Routes></MemoryRouter>);
}

function fillMeeting() {
  renderMeeting();
  fireEvent.click(screen.getByRole("button", { name: "단기 모임", exact: true }));
  fireEvent.click(screen.getByRole("button", { name: "취미", exact: true }));
  fireEvent.change(screen.getByLabelText("모임 날짜"), { target: { value: "2026-10-20" } });
  fireEvent.click(screen.getByRole("button", { name: "온라인", exact: true }));
  fireEvent.change(screen.getByLabelText("모임 주소"), { target: { value: "온라인" } });
  fireEvent.click(screen.getByRole("button", { name: "다음", exact: true }));
  fireEvent.change(screen.getByLabelText("모임 제목"), { target: { value: created.groupTitle } });
  fireEvent.change(screen.getByLabelText("모임 소개"), { target: { value: created.groupContent } });
  fireEvent.change(screen.getByLabelText("가입 질문"), { target: { value: created.groupQuestion } });
}

test.each([
  "<!DOCTYPE html><html><h1>Login with OAuth 2.0</h1></html>",
  { result: false, message: "Database error", data: null },
  { result: true, message: "Success", data: null },
])("a 200 response without a saved meeting is not shown as success: %p", async data => {
  (axios.post as jest.Mock).mockResolvedValue({ status: 200, data });
  fillMeeting();
  fireEvent.click(screen.getByRole("button", { name: "완료", exact: true }));
  expect(await screen.findByRole("alert")).toHaveTextContent(/등록|로그인/);
  expect(screen.getByLabelText("모임 제목")).toHaveValue(created.groupTitle);
  expect(window.alert).not.toHaveBeenCalledWith("모임이 성공적으로 등록되었습니다!");
});

test("authentication failure redirects to login", async () => {
  (axios.post as jest.Mock).mockRejectedValue({ response: { status: 401 } });
  fillMeeting();
  fireEvent.click(screen.getByRole("button", { name: "완료", exact: true }));
  expect(await screen.findByRole("heading", { name: "로그인 페이지" })).toBeInTheDocument();
  expect(window.alert).not.toHaveBeenCalled();
});

test("a guest opening create meeting is redirected before seeing the form", async () => {
  mockToken = undefined;
  renderMeeting();
  expect(await screen.findByRole("heading", { name: "로그인 페이지" })).toBeInTheDocument();
  expect(screen.queryByLabelText("모임 날짜")).not.toBeInTheDocument();
  expect(axios.post).not.toHaveBeenCalled();
});

test("confirmed save returns home and fetches the newly registered meeting", async () => {
  (axios.post as jest.Mock).mockResolvedValue({ status: 200, data: { result: true, message: "Success", data: created } });
  fillMeeting();
  fireEvent.click(screen.getByRole("button", { name: "완료", exact: true }));
  expect(await screen.findByRole("button", { name: created.groupTitle, exact: true })).toBeInTheDocument();
  expect(axios.get).toHaveBeenCalledWith(CATEGORY_GET_API, { params: { page: 1, limit: 12, sortBy: "default" } });
});

test("pending registration cannot be submitted twice", async () => {
  let finish: (value: unknown) => void = () => {};
  (axios.post as jest.Mock).mockImplementation(() => new Promise(resolve => { finish = resolve; }));
  fillMeeting();
  const submit = screen.getByRole("button", { name: "완료", exact: true });
  fireEvent.click(submit);
  fireEvent.click(submit);
  expect(axios.post).toHaveBeenCalledTimes(1);
  expect(submit).toBeDisabled();
  await act(async () => finish({ status: 200, data: { result: false, data: null } }));
  await waitFor(() => expect(submit).not.toBeDisabled());
});

test.each(["모임 제목", "모임 소개", "가입 질문"])("blank required %s is identified before submitting", async label => {
  fillMeeting();
  const field = screen.getByLabelText(label);
  fireEvent.change(field, { target: { value: "   " } });
  await act(async () => fireEvent.click(screen.getByRole("button", { name: "완료", exact: true })));
  expect(axios.post).not.toHaveBeenCalled();
  expect(field).toBeRequired();
  expect(field).toHaveFocus();
  expect(field).toHaveAttribute("aria-invalid", "true");
  expect(screen.getByRole("alert")).toHaveTextContent(label);
});

test("server validation identifies the field without blaming login or losing the draft", async () => {
  (axios.post as jest.Mock).mockRejectedValue({ response: { status: 400, data: {
    result: false, message: "입력 내용을 확인해주세요.", data: { groupQuestion: "가입 질문을 입력해주세요." },
  } } });
  fillMeeting();
  fireEvent.click(screen.getByRole("button", { name: "완료", exact: true }));
  expect(await screen.findByRole("alert")).toHaveTextContent("가입 질문을 입력해주세요.");
  expect(screen.getByLabelText("가입 질문")).toHaveFocus();
  expect(screen.getByLabelText("모임 제목")).toHaveValue(created.groupTitle);
});
