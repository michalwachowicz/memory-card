import { describe, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import HelpButton from "@/Components/buttons/HelpButton";

vi.mock("@/Components/HelpMenu", () => ({
  default: () => <div data-testid="menu">MENU</div>,
}));

describe("<HelpButton />", () => {
  it("renders closed button correctly", () => {
    render(<HelpButton />);
    const button = screen.getByRole("switch");

    expect(button).not.toBeChecked();
    expect(button).toHaveAccessibleName("Open help menu");
  });

  it("renders opened button correctly", () => {
    render(<HelpButton open />);
    const button = screen.getByRole("switch");

    expect(button).toBeChecked();
    expect(button).toHaveAccessibleName("Close help menu");

    expect(screen.getByTestId("menu")).toBeInTheDocument();
  });

  it("toggles the button on click", async () => {
    const fn = vi.fn();
    render(<HelpButton open onToggle={fn} />);

    const user = userEvent.setup();
    await user.click(screen.getByRole("switch"));

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(false);
  });
});
