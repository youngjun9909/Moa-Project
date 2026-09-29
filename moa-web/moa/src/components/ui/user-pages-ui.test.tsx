import { fireEvent, render, screen } from "@testing-library/react";
import {
  AsyncState,
  Pagination,
  ResultToolbar,
  SortTabs,
} from "./index";

describe("shared user page patterns", () => {
  test("sort tabs expose and update their pressed state", () => {
    const onChange = jest.fn();
    render(
      <SortTabs
        value="recent"
        options={[
          { value: "recent", label: "최신순" },
          { value: "popular", label: "추천순" },
        ]}
        onChange={onChange}
      />
    );

    expect(screen.getByRole("button", { name: "최신순" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
    fireEvent.click(screen.getByRole("button", { name: "추천순" }));
    expect(onChange).toHaveBeenCalledWith("popular");
  });

  test("pagination marks the current page and blocks disabled navigation", () => {
    const onChange = jest.fn();
    render(<Pagination page={1} totalPages={4} onChange={onChange} />);

    expect(screen.getByRole("button", { name: "1페이지" })).toHaveAttribute(
      "aria-current",
      "page"
    );
    expect(screen.getByRole("button", { name: "이전 페이지" })).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: "이전 페이지" }));
    expect(onChange).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "2페이지" }));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  test("async state distinguishes empty results from request errors", () => {
    const { rerender } = render(
      <AsyncState
        status="empty"
        empty={{ title: "아직 모임이 없어요", description: "조건을 바꿔보세요." }}
        error={{ title: "모임을 불러오지 못했어요" }}
      >
        <div>모임 목록</div>
      </AsyncState>
    );

    expect(screen.getByRole("status", { name: "빈 결과" })).toBeInTheDocument();
    rerender(
      <AsyncState
        status="error"
        empty={{ title: "아직 모임이 없어요" }}
        error={{ title: "모임을 불러오지 못했어요" }}
      >
        <div>모임 목록</div>
      </AsyncState>
    );
    expect(screen.getByRole("alert", { name: "요청 오류" })).toBeInTheDocument();
  });

  test("result toolbar keeps its actions keyboard focusable", () => {
    render(
      <ResultToolbar
        title="전체 모임"
        count={24}
        actions={<button type="button">모임 만들기</button>}
      />
    );

    const action = screen.getByRole("button", { name: "모임 만들기" });
    action.focus();
    expect(action).toHaveFocus();
    expect(screen.getByText("24개의 모임")).toBeInTheDocument();
  });
});
