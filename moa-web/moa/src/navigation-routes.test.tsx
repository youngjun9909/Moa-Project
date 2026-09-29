import fs from "fs";
import path from "path";

const read = (file: string) => fs.readFileSync(path.join(process.cwd(), "src", file), "utf8");

describe("navigation and route contracts", () => {
  test("notice route is registered once", () => {
    const app = read("App.tsx");
    expect((app.match(/path=\{p\.NOTICE_PAGE\}/g) || []).length).toBe(1);
  });

  test("global navigation has one category destination and no find-menu copy", () => {
    const nav = read("layouts/information-navi-bar/InformationNaviBar.tsx");
    expect(nav).toContain("카테고리");
    expect(nav).not.toContain("모임 찾기");
  });

  test("landing external links are safe", () => {
    const landing = read("views/web-main/WebMainPage.tsx");
    expect(landing).toContain('rel="noreferrer"');
  });
});
