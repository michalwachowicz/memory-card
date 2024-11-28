import { describe, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import SoundButton from "@/Components/buttons/SoundButton";

describe("<SoundButton />", () => {
  it("renders with a proper label", () => {
    const { rerender } = render(<SoundButton />);

    expect(screen.getByRole("switch")).not.toBeChecked();
    expect(screen.getByRole("switch")).toHaveAccessibleName("Enable sound");

    rerender(<SoundButton enabled />);

    expect(screen.getByRole("switch")).toBeChecked();
    expect(screen.getByRole("switch")).toHaveAccessibleName("Disable sound");
  });

  it("toggles the switch when button is clicked", async () => {
    const fn = vi.fn();
    render(<SoundButton onToggle={fn} />);

    const user = userEvent.setup();
    await user.click(screen.getByRole("switch"));

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(true);
  });
});
