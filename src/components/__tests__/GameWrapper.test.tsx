import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { act } from "react";
import GameWrapper from "@/Components/GameWrapper";

vi.mock("@/Components/screens/GameplayScreen", () => ({
  default: ({
    onRestart,
    onGameOver,
  }: {
    onRestart: () => void;
    onGameOver: (win: boolean) => void;
  }) => (
    <div data-testid="gameplay">
      <button type="button" data-testid="restart" onClick={() => onRestart()}>
        Logo
      </button>
      <button
        type="button"
        data-testid="gameover"
        onClick={() => onGameOver(true)}
      >
        Game Over
      </button>
    </div>
  ),
}));

describe("<GameWrapper />", () => {
  it("renders main screen and settings buttons on initial render", () => {
    render(<GameWrapper />);

    expect(screen.getByRole("button", { name: /easy/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/sound/i)).toBeInTheDocument();
  });

  it("switches to gameplay screen on difficulty selection", async () => {
    render(<GameWrapper />);

    const user = userEvent.setup();
    await act(async () => {
      await user.click(screen.getByRole("button", { name: /easy/i }));
    });

    expect(screen.getByTestId("gameplay")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /easy/i }),
    ).not.toBeInTheDocument();
    expect(screen.getByLabelText(/sound/i)).toBeInTheDocument();
  });

  it("returns to main screen on logo gameplay screen click", async () => {
    render(<GameWrapper />);

    const user = userEvent.setup();
    await act(async () => {
      await user.click(screen.getByRole("button", { name: /easy/i }));
    });

    expect(screen.getByTestId("restart")).toBeInTheDocument();
    await act(async () => {
      await user.click(screen.getByTestId("restart"));
    });

    expect(screen.queryByRole("button", { name: /easy/i })).toBeInTheDocument();
  });

  it("switches to game result screen on game over", async () => {
    render(<GameWrapper />);

    const user = userEvent.setup();
    await act(async () => {
      await user.click(screen.getByRole("button", { name: /easy/i }));
    });

    expect(screen.getByTestId("gameover")).toBeInTheDocument();
    await act(async () => {
      await user.click(screen.getByTestId("gameover"));
    });

    expect(screen.queryByTestId("gameover")).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/sound/i)).not.toBeInTheDocument();
    expect(screen.getByText(/restart/i)).toBeInTheDocument();
  });

  it("switches back to main screen after game over restart", async () => {
    render(<GameWrapper />);

    const user = userEvent.setup();
    await act(async () => {
      await user.click(screen.getByRole("button", { name: /easy/i }));
    });

    await act(async () => {
      await user.click(screen.getByTestId("gameover"));
    });

    await act(async () => {
      await user.click(screen.getByText(/restart/i));
    });

    expect(screen.getByRole("button", { name: /easy/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/sound/i)).toBeInTheDocument();
  });
});
