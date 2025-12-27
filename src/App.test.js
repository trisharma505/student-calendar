import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
  test("renders Website component", () => {
    render(<App />);
    expect(screen.getByText("TimeTrack")).toBeInTheDocument();
    expect(screen.getByText("Assignments")).toBeInTheDocument();
    expect(screen.getByText("Calendar")).toBeInTheDocument();
  });
});
