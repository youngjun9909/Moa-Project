import { render, screen, waitFor } from "@testing-library/react";

const previousApiKey = process.env.REACT_APP_NAVER_API;
process.env.REACT_APP_NAVER_API = "test-key-not-a-secret";
const NaverMapComponent = require("./NaverMap").default;

afterAll(() => {
  if (previousApiKey === undefined) delete process.env.REACT_APP_NAVER_API;
  else process.env.REACT_APP_NAVER_API = previousApiKey;
});

test("loads the SDK with ncpKeyId and the geocoder submodule", () => {
  const append = jest.spyOn(document.head, "appendChild");
  render(<NaverMapComponent address="서울 마포구 월드컵로 1" />);
  const script = append.mock.calls
    .map(([node]) => node)
    .find((node): node is HTMLScriptElement => node instanceof HTMLScriptElement);
  expect(script?.src).toContain("oapi.map.naver.com/openapi/v3/maps.js");
  expect(script?.src).toContain("ncpKeyId=test-key-not-a-secret");
  expect(script?.src).toContain("submodules=geocoder");
  expect(script?.src).not.toContain("ncpClientId");
  expect(screen.getByText("서울 마포구 월드컵로 1")).toBeInTheDocument();
  append.mockRestore();
});

test("shows a readable fallback when the SDK fails to load", async () => {
  render(<NaverMapComponent address="부산 해운대구" />);
  const script = document.getElementById("naver-maps-sdk") as HTMLScriptElement;
  script.onerror?.(new Event("error"));
  await waitFor(() => expect(screen.getByText(/지도를 불러오지 못했어요/)).toBeInTheDocument());
  expect(screen.getByText("부산 해운대구")).toBeInTheDocument();
});

test("missing location has an understandable fallback", () => {
  render(<NaverMapComponent address="" />);
  expect(screen.getByText(/주소가 존재하지 않습니다/)).toBeInTheDocument();
});
