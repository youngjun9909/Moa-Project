import fs from "fs";
import path from "path";
const read = (file:string) => fs.readFileSync(path.join(process.cwd(),"src",file),"utf8");

describe("community page contracts", () => {
  test("notice rows expose semantic dates", () => expect(read("views/notice/NoticePage.tsx")).toContain("<time"));
  test("review feed does not use an inline sentinel style", () => expect(read("views/review/review-main/ReviewMain.tsx")).not.toContain('style={{ height: "10px"'));
  test("review feed uses an explicit load-more control", () => {
    const source = read("views/review/review-main/ReviewMain.tsx");
    expect(source).not.toContain("IntersectionObserver");
    expect(source).toContain("더 보기");
  });
  test("my reviews uses a real empty-length check", () => expect(read("views/my-page/mypage-review/MyPageReview.tsx")).toContain("reviewData.length > 0"));
});
