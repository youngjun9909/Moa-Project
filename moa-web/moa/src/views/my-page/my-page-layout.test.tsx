import fs from "fs";
import path from "path";

const read = (file: string) => fs.readFileSync(path.join(process.cwd(), "src/views/my-page", file), "utf8");

describe("my page layout contracts", () => {
  test("account pages use a clear page heading", () => {
    expect(read("get-user-info/MyPageStart.tsx")).toContain("<h1");
    expect(read("get-user-info/GetUserInfo.tsx")).toContain("<h1");
  });

  test("participation history has an explicit empty state", () => {
    expect(read("participation-status-page/ParticipationStatusPage.tsx")).toContain("EmptyState");
  });

  test("withdrawal flow isolates the destructive action", () => {
    expect(read("delete-user-info/DelelteUserInfoStart.tsx")).toContain("dangerZone");
    expect(read("delete-user-info/DelelteUserInfo.tsx")).toContain("dangerZone");
  });
});
