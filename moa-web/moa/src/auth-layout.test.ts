import { isStandaloneAuthPath } from "./constants";

describe("standalone authentication layout", () => {
  test.each(["/signIn", "/signUp", "/findPassword", "/findUserId"])(
    "%s does not render inside the community workspace shell",
    (path) => expect(isStandaloneAuthPath(path)).toBe(true)
  );

  test("community routes keep the workspace shell", () => {
    expect(isStandaloneAuthPath("/main")).toBe(false);
  });
});
