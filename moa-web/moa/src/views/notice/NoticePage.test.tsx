import { render, screen } from "@testing-library/react";
import axios from "axios";
import NoticePage from "./NoticePage";
jest.mock("axios", () => ({ get: jest.fn() }));
test("notice request failures show a retry state, not an empty feed", async () => {
  (axios.get as jest.Mock).mockRejectedValue(new Error("offline"));
  render(<NoticePage />);
  expect(await screen.findByRole("alert")).toHaveTextContent("공지사항을 불러오지 못했어요");
  expect(screen.getByRole("button", {name:"다시 시도"})).toBeInTheDocument();
  expect(screen.queryByText("등록된 공지사항이 없어요")).not.toBeInTheDocument();
});
