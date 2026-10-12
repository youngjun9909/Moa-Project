import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import SignUp from "./SignUp";
import { SIGN_UP_HPBBY_GET_API, SIGN_UP_DUPLICATION_USERID_API } from "../../../apis";

jest.mock("axios", () => ({ get: jest.fn(), post: jest.fn() }));
const success = (data: unknown) => ({ data: { result: true, message: "Success", data } });

beforeEach(() => {
  jest.resetAllMocks();
  (axios.get as jest.Mock).mockImplementation((url: string) => Promise.resolve(success(url === SIGN_UP_HPBBY_GET_API ? [] : false)));
});

function change(name: string, value: string) {
  fireEvent.change(document.querySelector(`input[name="${name}"]`)!, { target: { value } });
}

async function fillBasics(overrides: Record<string, string> = {}) {
  render(<MemoryRouter><SignUp /></MemoryRouter>);
  fireEvent.click(screen.getByRole("button", { name: "Moa 계정으로 회원가입" }));
  const fields = { userId: "fixture123", password: "Sample123!", confirmPassword: "Sample123!", nickName: "테스트닉", userName: "테스트", phoneNumber: "01012345678", userBirthDate: "19950102", email: "fixture@example.com", ...overrides };
  Object.entries(fields).forEach(([name, value]) => change(name, value));
  fireEvent.click(screen.getByLabelText("남자"));
  const checks = screen.getAllByRole("button", { name: "중복 확인" });
  fireEvent.click(checks[0]);
  fireEvent.click(checks[1]);
  await screen.findByText(/아이디 중복확인 완료/);
  await screen.findByText(/닉네임 중복확인 완료/);
}

test("valid required fields and duplicate checks advance to preferences", async () => {
  await fillBasics();
  fireEvent.click(screen.getByRole("button", { name: "다음" }));
  expect(screen.getByRole("heading", { name: "나의 취향 소개" })).toBeInTheDocument();
  expect(axios.post).not.toHaveBeenCalled();
});

test("matching invalid passwords retain their format error and focus the password", async () => {
  await fillBasics({ password: "abcdefgh", confirmPassword: "abcdefgh" });
  fireEvent.click(screen.getByRole("button", { name: "다음" }));
  expect(screen.getByRole("alert")).toHaveTextContent(/비밀번호.*영문.*숫자.*특수문자/);
  expect(document.querySelector('[name="password"]')).toHaveFocus();
  expect(screen.queryByRole("heading", { name: "나의 취향 소개" })).not.toBeInTheDocument();
});

test("invalid phone is explained even with a valid name", async () => {
  await fillBasics({ phoneNumber: "123" });
  fireEvent.click(screen.getByRole("button", { name: "다음" }));
  expect(screen.getByRole("alert")).toHaveTextContent(/휴대폰/);
  expect(document.querySelector('[name="phoneNumber"]')).toHaveFocus();
});

test("common phone and birth date separators do not block valid signup", async () => {
  await fillBasics({ phoneNumber: "010-1234-5678", userBirthDate: "1995-01-02" });
  fireEvent.click(screen.getByRole("button", { name: "다음" }));
  expect(screen.getByRole("heading", { name: "나의 취향 소개" })).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "이전" }));
  expect(document.querySelector('[name="userBirthDate"]')).toHaveValue("19950102");
  expect(screen.getByLabelText("남자")).toBeChecked();
});

test("editing a checked ID requires checking that new value", async () => {
  await fillBasics();
  change("userId", "changed123");
  fireEvent.click(screen.getByRole("button", { name: "다음" }));
  expect(screen.getByRole("alert")).toHaveTextContent(/아이디.*중복/);
  expect(screen.queryByRole("heading", { name: "나의 취향 소개" })).not.toBeInTheDocument();
});

test("a stale duplicate-check response cannot approve an edited ID", async () => {
  await fillBasics();
  let finish: (value: unknown) => void = () => {};
  (axios.get as jest.Mock).mockImplementation((url: string) => url.startsWith(SIGN_UP_DUPLICATION_USERID_API)
    ? new Promise(resolve => { finish = resolve; }) : Promise.resolve(success(false)));
  change("userId", "pending123");
  fireEvent.click(screen.getAllByRole("button", { name: "중복 확인" })[0]);
  change("userId", "another123");
  await act(async () => finish(success(false)));
  fireEvent.click(screen.getByRole("button", { name: "다음" }));
  expect(screen.getByRole("alert")).toHaveTextContent(/아이디.*중복/);
  expect(screen.queryByRole("heading", { name: "나의 취향 소개" })).not.toBeInTheDocument();
});

test("missing required email is labeled and explained", async () => {
  await fillBasics({ email: "" });
  fireEvent.click(screen.getByRole("button", { name: "다음" }));
  expect(screen.getByRole("alert")).toHaveTextContent(/이메일/);
  expect(screen.getByLabelText(/이메일\*/)).toHaveAttribute("name", "email");
});

test("duplicate-check network failure provides a retry explanation", async () => {
  await fillBasics();
  change("nickName", "다른닉");
  (axios.get as jest.Mock).mockRejectedValue(new Error("offline"));
  fireEvent.click(screen.getAllByRole("button", { name: "중복 확인" })[1]);
  expect(await screen.findByText(/닉네임 중복 확인에 실패/)).toBeInTheDocument();
});

test("successful recheck removes its stale summary without hiding other errors", async () => {
  await fillBasics();
  change("userId", "rechecked123");
  change("phoneNumber", "123");
  fireEvent.click(screen.getByRole("button", { name: "다음" }));
  expect(screen.getByRole("alert")).toHaveTextContent(/아이디.*중복/);
  fireEvent.click(screen.getAllByRole("button", { name: "중복 확인" })[0]);
  await screen.findByText(/아이디 중복확인 완료/);
  expect(screen.getByRole("alert")).not.toHaveTextContent(/아이디.*중복/);
  expect(screen.getByRole("alert")).toHaveTextContent(/휴대폰/);
});
