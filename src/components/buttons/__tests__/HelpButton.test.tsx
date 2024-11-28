import { describe, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { act } from "react";
import HelpButton from "@/Components/buttons/HelpButton";

vi.mock("@/Components/HelpMenu", () => ({
  default: () => <div data-testid="menu">MENU</div>,
}));

describe("<HelpButton />", () => {
  it("toggles the button on click", async () => {
    render(<HelpButton />);
    const button = screen.getByRole("switch");

    expect(button).not.toBeChecked();
    expect(button).toHaveAccessibleName("Open help menu");

    const user = userEvent.setup();
    await act(async () => {
      await user.click(button);

      expect(button).not.toBeChecked();
      expect(button).toHaveAccessibleName("Open help menu");

      expect(screen.queryByTestId("menu")).not.toBeInTheDocument();
    });

    await act(async () => {
      await user.click(button);

      expect(button).toBeChecked();
      expect(button).toHaveAccessibleName("Close help menu");

      expect(screen.getByTestId("menu")).toBeInTheDocument();
    });
  });
});
