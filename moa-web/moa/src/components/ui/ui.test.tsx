import { render, screen } from "@testing-library/react";
import { Button, EmptyState, FormField, PageHeader } from "./index";

describe("MOA UI primitives", () => {
  test("buttons default to a safe type and expose their visual intent", () => {
    render(
      <>
        <Button>참여하기</Button>
        <Button variant="destructive">모임 해체</Button>
      </>
    );

    expect(screen.getByRole("button", { name: "참여하기" })).toHaveAttribute("type", "button");
    expect(screen.getByRole("button", { name: "참여하기" })).toHaveAttribute("data-variant", "primary");
    expect(screen.getByRole("button", { name: "모임 해체" })).toHaveAttribute("data-variant", "destructive");
  });

  test("page header exposes a single page heading", () => {
    render(<PageHeader eyebrow="DISCOVER" title="모임 둘러보기" description="취향에 맞는 모임을 찾아보세요." />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { name: "모임 둘러보기" })).toBeInTheDocument();
  });

  test("form field connects hint and error copy to its control", () => {
    render(
      <FormField label="모임 이름" hint="한눈에 알아볼 수 있게 적어주세요." error="모임 이름을 입력해주세요." required>
        <input id="group-title" />
      </FormField>
    );
    const input = screen.getByLabelText(/모임 이름/);
    expect(input).toHaveAttribute("aria-describedby", "group-title-hint group-title-error");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  test("empty state keeps the suggested next action available", () => {
    render(<EmptyState title="아직 모임이 없어요" description="새로운 모임을 찾아보세요." action={<Button>모임 찾기</Button>} />);
    expect(screen.getByRole("button", { name: "모임 찾기" })).toBeInTheDocument();
  });
});
