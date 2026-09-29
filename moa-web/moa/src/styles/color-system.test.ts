import { chip } from "./theme";
import * as search from "../layouts/search-bar/style";
import * as signIn from "../views/auth/signin/style";
import * as topNav from "../layouts/information-navi-bar/style";

describe("warm community color system", () => {
  test("chips use the warm interactive palette", () => {
    expect(chip.styles).toContain("var(--moa-chip-bg)");
    expect(chip.styles).toContain("var(--moa-chip-line)");
  });

  test("search filters and auth links avoid disabled-looking gray colors", () => {
    expect(search.buttonStyle.styles).toContain("var(--moa-chip-bg)");
    expect(signIn.linkText.styles).toContain("var(--moa-link)");
  });

  test("header account and create actions share the same height", () => {
    expect(topNav.createGroupButton.styles).toContain("min-height:40px");
    expect(topNav.signBtn.styles).toContain("min-height:40px");
  });
});
