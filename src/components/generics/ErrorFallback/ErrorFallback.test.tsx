import React from "react";
import { render } from "@testing-library/react";
import ErrorFallback from "./ErrorFallback";

test("renders learn react link", () => {
  const { getByText } = render(<ErrorFallback />);
  const linkElement = getByText(/Failed to load/i);
  expect(linkElement).toBeInTheDocument();
});
