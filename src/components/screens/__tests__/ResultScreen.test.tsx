import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import ResultScreen from "@/Components/screens/ResultScreen";

describe("<ResultScreen />", () => {
  it("renders victory properly", () => {
    render(<ResultScreen result="victory" />);
    expect(screen.getByAltText("Victory")).toBeInTheDocument();
  });

  it("renders defeat properly", () => {
    render(<ResultScreen result="defeat" />);
    expect(screen.getByAltText("Defeat")).toBeInTheDocument();
  });

  it("restarts the game on button click", async () => {
    const fn = vi.fn();
    render(<ResultScreen onRestart={fn} />);

    const user = userEvent.setup();
    await user.click(screen.getByRole("button"));

    expect(fn).toHaveBeenCalledTimes(1);
  });
});
