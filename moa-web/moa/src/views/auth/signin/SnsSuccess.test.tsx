import { render, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import axios from "axios";
import SnsSuccess from "./SnsSuccess";

jest.mock("axios", () => ({ post: jest.fn() }));
const mockedPost = axios.post as jest.Mock;
const mockSetCookie = jest.fn();
jest.mock("react-cookie", () => ({ useCookies: () => [{}, mockSetCookie] }));

function Where() {
  return <span data-testid="where">{useLocation().pathname}</span>;
}

const renderAt = (url: string) =>
  render(
    <MemoryRouter initialEntries={[url]}>
      <Routes>
        <Route path="/sns-success" element={<SnsSuccess />} />
        <Route path="*" element={<Where />} />
      </Routes>
    </MemoryRouter>
  );

beforeEach(() => {
  mockedPost.mockReset();
  mockSetCookie.mockReset();
});

test("exchanges the one-time code for a token cookie without reading a token from the URL", async () => {
  mockedPost.mockResolvedValue({ data: { data: { token: "jwt", expiration: 36000000 } } });
  const { findByTestId } = renderAt("/sns-success?code=abc123&accessToken=leaked");
  expect((await findByTestId("where")).textContent).toBe("/main");
  expect(mockedPost).toHaveBeenCalledTimes(1);
  expect(mockedPost.mock.calls[0][1]).toEqual({ code: "abc123" });
  expect(mockSetCookie).toHaveBeenCalledWith("token", "jwt", expect.objectContaining({ path: "/" }));
});

test("sends the user back to sign in when the code is rejected", async () => {
  mockedPost.mockRejectedValue(new Error("401"));
  const { findByTestId } = renderAt("/sns-success?code=expired");
  expect((await findByTestId("where")).textContent).toBe("/signIn");
  expect(mockSetCookie).not.toHaveBeenCalled();
});

test("falls back to sign up when there is no code", async () => {
  const { findByTestId } = renderAt("/sns-success");
  expect((await findByTestId("where")).textContent).toBe("/signUp");
  expect(mockedPost).not.toHaveBeenCalled();
});
