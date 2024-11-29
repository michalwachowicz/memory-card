import { describe, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import LogoButton from "@/Components/buttons/LogoButton";

describe("<LogoButton />", () => {
  it("handles onClick when clicked", async () => {
    const fn = vi.fn();
    render(<LogoButton onClick={fn} />);

    const user = userEvent.setup();
    await user.click(screen.getByRole("button"));

    expect(fn).toHaveBeenCalledTimes(1);
  });
});
