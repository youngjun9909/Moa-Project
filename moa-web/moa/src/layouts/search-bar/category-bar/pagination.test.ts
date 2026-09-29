import { buildPageNumbers } from "../resultStyle";

describe("category result pagination", () => {
  test("shows all page numbers when the result has five pages or fewer", () => {
    expect(buildPageNumbers(3, 5)).toEqual([1, 2, 3, 4, 5]);
  });

  test("keeps the current page centered in a five-page window", () => {
    expect(buildPageNumbers(6, 12)).toEqual([4, 5, 6, 7, 8]);
  });

  test("pins the page window to the final page", () => {
    expect(buildPageNumbers(11, 12)).toEqual([8, 9, 10, 11, 12]);
  });
});
