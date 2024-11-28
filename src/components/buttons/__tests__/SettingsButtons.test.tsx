import { describe, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import SettingsButtons from "@/Components/buttons/SettingsButtons";

vi.mock("@/Components/buttons/SoundButton", () => ({
  default: (props: { onToggle: (toggle: boolean) => void }) => (
    <button
      type="button"
      data-testid="sound"
      onClick={() => props.onToggle(true)}
    >
      sound
    </button>
  ),
}));

vi.mock("@/Components/buttons/HelpButton", () => ({
  default: () => (
    <button type="button" data-testid="help">
      help
    </button>
  ),
}));

describe("<SettingsButtons />", () => {
  it("renders all buttons", () => {
    render(<SettingsButtons />);

    expect(screen.getByTestId("sound")).toBeInTheDocument();
    expect(screen.getByTestId("help")).toBeInTheDocument();
  });

  it("calls the sound method", async () => {
    const fn = vi.fn();
    render(<SettingsButtons onSoundToggle={fn} />);

    const user = userEvent.setup();
    await user.click(screen.getByTestId("sound"));

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(true);
  });
});
