import { describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HelpMenu from "@/Components/HelpMenu";

describe("<HelpMenu />", () => {
  it("renders correctly", () => {
    render(<HelpMenu />);

    expect(
      screen.getByText(/Don’t click on the same card twice/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Click “The Witcher” logo to restart/i),
    ).toBeInTheDocument();
  });
});
