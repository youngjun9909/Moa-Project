import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import JoinGroupStart from "./join-group/JoinGroupStart";
import JoinGroupAnswer from "./join-group/JoinGroupAnswer";
import GroupAnswerResult from "./join-group/GroupAnswerResult";
import GroupHeader from "./GroupHeader";

jest.mock("axios", () => ({ __esModule: true, default: { get: jest.fn(), post: jest.fn(), delete: jest.fn() } }));
const mockedAxios = axios as jest.Mocked<typeof axios>;
const group = { groupId: 1, groupTitle: "산책 모임", groupQuestion: "왜 함께하고 싶나요?", groupDate: "2026-10-01" };

function atRoute(path: string, element: React.ReactElement) {
  return <MemoryRouter initialEntries={[path]}><Routes><Route path="*" element={element} /></Routes></MemoryRouter>;
}

describe("meeting participation flow", () => {
  beforeEach(() => {
    document.cookie = "token=test; path=/";
    mockedAxios.get.mockReset();
    mockedAxios.get.mockResolvedValue({ data: { data: group } });
  });

  test("start page identifies the first participation step with one H1", () => {
    render(atRoute("/group-join/join-group/1", <JoinGroupStart />));
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByText(/1단계/)).toBeInTheDocument();
  });

  test("answer page labels the participation answer field", async () => {
    render(atRoute("/group-join/join-group/1/group-user-answer", <JoinGroupAnswer />));
    expect(await screen.findByLabelText("참여 신청 답변")).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  test("result page exposes completion as its page heading", async () => {
    render(atRoute("/group-join/join-group/1/group-user-answer/result", <GroupAnswerResult />));
    expect(await screen.findByRole("heading", { level: 1, name: "참여 신청 완료" })).toBeInTheDocument();
  });

  test("meeting workspace uses member and meeting-operation language", async () => {
    mockedAxios.get
      .mockResolvedValueOnce({ data: { data: group } })
      .mockResolvedValueOnce({ data: { data: false } })
      .mockResolvedValueOnce({ data: { data: true } });
    render(atRoute("/join-group/1", <GroupHeader />));
    expect(await screen.findByRole("button", { name: "모임 설정" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /멤버/ })).toBeInTheDocument();
    expect(screen.queryByText(/관리자/)).not.toBeInTheDocument();
  });
});
