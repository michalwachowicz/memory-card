import { describe, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import GameButton from "@/Components/buttons/GameButton";

describe("<GameButton />", () => {
  it("renders with specific label", () => {
    render(<GameButton label="Test" />);
    expect(screen.getByRole("button", { name: "Test" })).toBeInTheDocument();
  });

  it("handles clicks properly", async () => {
    const fn = vi.fn();
    render(<GameButton label="Test" difficulty="easy" onClick={fn} />);

    const button = screen.getByRole("button", { name: "Test" });
    const user = userEvent.setup();

    await user.click(button);

    expect(fn).toBeCalledTimes(1);
    expect(fn).toBeCalledWith("easy");
  });
});
