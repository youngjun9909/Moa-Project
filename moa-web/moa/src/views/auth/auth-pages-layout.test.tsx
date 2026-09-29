import fs from "fs";
import path from "path";

const read = (file: string) => fs.readFileSync(path.join(process.cwd(), "src/views/auth", file), "utf8");

describe("authentication page layout contracts", () => {
  test.each([
    "signin/SignIn.tsx",
    "signup/SignUp.tsx",
    "find-user-id/FindUserId.tsx",
    "find-user-id/FindUserIdResult.tsx",
    "find-password/FindPassword.tsx",
    "find-password/VerificationPassword.tsx",
  ])("%s exposes one primary heading", (file) => expect(read(file)).toContain("<h1"));

  test("recovery forms connect labels and announce feedback", () => {
    expect(read("find-user-id/FindUserId.tsx")).toContain("htmlFor=");
    expect(read("find-password/FindPassword.tsx")).toContain("aria-live");
    expect(read("find-password/VerificationPassword.tsx")).toContain("aria-live");
  });
});
