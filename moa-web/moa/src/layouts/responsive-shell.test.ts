import { responsiveFullBox } from "./group-navi-bar/style";
import { responsiveInfo, signBtn } from "./information-navi-bar/style";

describe("responsive shell compatibility styles", () => {
  test("do not override desktop shell widths", () => {
    expect(responsiveFullBox.styles).not.toContain("width:100%");
    expect(responsiveInfo.styles).not.toContain("width:100%");
  });

  test("shortens the signed-out action on narrow screens", () => {
    expect(signBtn.styles).toContain('content:"로그인"');
  });
});
