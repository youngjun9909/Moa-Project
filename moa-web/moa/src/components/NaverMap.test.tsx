import { render, screen } from "@testing-library/react";
import { readFileSync } from "fs";
import path from "path";

const previousApiKey = process.env.REACT_APP_NAVER_API;
process.env.REACT_APP_NAVER_API = "test-key-not-a-secret";
const NaverMapComponent = require("./NaverMap").default;

afterAll(() => {
  if (previousApiKey === undefined) delete process.env.REACT_APP_NAVER_API;
  else process.env.REACT_APP_NAVER_API = previousApiKey;
});

test("app HTML does not request the retired map SDK on page load", () => {
  const html = readFileSync(path.join(process.cwd(), "public/index.html"), "utf8");
  const page = new DOMParser().parseFromString(html, "text/html");
  const mapScripts = Array.from(page.scripts).filter(script => /map\.naver\.com/.test(script.src));
  expect(mapScripts).toHaveLength(0);
});

test("location remains readable without geocoding or loading a map SDK", () => {
  const geocode = jest.fn();
  const previousNaver = window.naver;
  window.naver = { maps: { Service: { geocode } } } as any;
  const append = jest.spyOn(document.head, "appendChild");
  try {
    const { rerender } = render(<NaverMapComponent address="서울 마포구 월드컵로 1" />);
    expect(geocode).not.toHaveBeenCalled();
    expect(screen.getByText("서울 마포구 월드컵로 1")).toBeInTheDocument();
    rerender(<NaverMapComponent address="부산 해운대구" />);
    expect(screen.getByText("부산 해운대구")).toBeInTheDocument();
    expect(geocode).not.toHaveBeenCalled();
    expect(append.mock.calls.some(([node]) => node instanceof HTMLScriptElement)).toBe(false);
  } finally {
    window.naver = previousNaver;
    append.mockRestore();
  }
});

test("missing location has an understandable fallback", () => {
  render(<NaverMapComponent address="" />);
  expect(screen.getByText(/주소가 존재하지 않습니다/)).toBeInTheDocument();
});
