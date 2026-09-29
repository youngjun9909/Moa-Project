import fs from "fs";
import path from "path";

const read = (relativePath: string) => fs.readFileSync(path.join(process.cwd(), "src", relativePath), "utf8");

describe("user form layout contracts", () => {
  test("meeting creation connects core labels to their controls", () => {
    const source = read("views/group-detail/create-group/CreateGroup.tsx");
    expect(source).toContain('htmlFor="group-date"');
    expect(source).toContain('htmlFor="group-title"');
    expect(source).toContain('htmlFor="group-content"');
  });

  test("meeting update is presented as a user meeting operation", () => {
    const source = read("views/manager/group-update/GroupUpdate.tsx");
    expect(source).toContain("모임 정보 수정");
    expect(source).toContain('htmlFor="update-title"');
  });

  test("review and report text areas have labels and user-facing copy", () => {
    const review = read("views/review/create-review/CreateReview.tsx");
    const report = read("views/report/ReportPage.tsx");
    expect(review).toContain('htmlFor="reviewContent"');
    expect(report).toContain('htmlFor="reportContent"');
    expect(report).not.toContain("해당 모임의 관리자만");
  });
});
