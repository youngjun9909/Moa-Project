import React from "react";
import { render, screen } from "@testing-library/react";
import RootLayout from "./layouts/root-layout/RootLayout";

test("renders the application workspace content", () => {
  render(<RootLayout><main>MOA workspace</main></RootLayout>);
  expect(screen.getByRole("main")).toHaveTextContent("MOA workspace");
});
