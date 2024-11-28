import { describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MainScreen from "@/Components/screens/MainScreen";

describe("<MainScreen />", () => {
  it("renders logo", () => {
    render(<MainScreen />);
    expect(screen.getByLabelText(/the witcher logo/i)).toBeInTheDocument();
  });

  it("renders all buttons", () => {
    render(<MainScreen />);

    [/easy/i, /medium/i, /hard/i].forEach((label) =>
      expect(screen.getByRole("button", { name: label })).toBeInTheDocument(),
    );
  });
});
