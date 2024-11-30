import { describe, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
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

  it("handles click properly", async () => {
    const fn = vi.fn();
    render(<MainScreen onDifficultySelect={fn} />);

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /easy/i }));

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("easy");
  });
});
