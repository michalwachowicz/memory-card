import { afterEach, beforeEach, describe, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { act } from "react";
import { userEvent } from "@testing-library/user-event";
import GameplayScreen from "@/Components/screens/GameplayScreen";
import Card from "../../../types/Card";

vi.mock("@/Components/CardContainer", () => ({
  default: ({
    cards,
    flipped,
    onClick,
  }: {
    cards: Card[];
    flipped: boolean;
    onClick: (id?: number) => void;
  }) => (
    <div data-testid="cards">
      {cards.map((card) => (
        <button
          type="button"
          onClick={() => onClick(card.id)}
          key={card.id}
          data-testid="card"
          data-id={card.id}
        >
          {flipped ? "flipped" : card.name}
        </button>
      ))}
    </div>
  ),
}));

vi.mock("@/Components/buttons/LogoButton", () => ({
  default: ({ onClick }: { onClick: () => void }) => (
    <button type="button" onClick={onClick} data-testid="btn-logo">
      Logo
    </button>
  ),
}));

describe("<GameplayScreen />", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders with proper initial values", () => {
    const { rerender } = render(
      <GameplayScreen difficulty="easy" initialHighScore={4} />,
    );

    expect(screen.getByText(/high score: 4/i)).toBeInTheDocument();
    expect(screen.getByText(/^score: 0/i)).toBeInTheDocument();
    expect(screen.getByText(/1 \/ 6/i)).toBeInTheDocument();

    rerender(<GameplayScreen difficulty="medium" initialHighScore={2} />);

    expect(screen.getByText(/high score: 4/i)).toBeInTheDocument();
    expect(screen.getByText(/^score: 0/i)).toBeInTheDocument();
    expect(screen.getByText(/1 \/ 8/i)).toBeInTheDocument();
  });

  it("increases values on card click", async () => {
    render(<GameplayScreen difficulty="easy" />);
    expect(screen.getByText(/high score: 0/i)).toBeInTheDocument();
    expect(screen.getByText(/^score: 0/i)).toBeInTheDocument();
    expect(screen.getByText(/1 \/ 6/i)).toBeInTheDocument();

    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    await act(async () => {
      await user.click(screen.getAllByTestId("card")[0]);
    });

    expect(screen.getByText(/high score: 1/i)).toBeInTheDocument();
    expect(screen.getByText(/^score: 1/i)).toBeInTheDocument();
    expect(screen.getByText(/2 \/ 6/i)).toBeInTheDocument();
  });

  it("increases only score if high score is bigger", async () => {
    render(<GameplayScreen difficulty="easy" initialHighScore={2} />);
    expect(screen.getByText(/high score: 2/i)).toBeInTheDocument();
    expect(screen.getByText(/^score: 0/i)).toBeInTheDocument();
    expect(screen.getByText(/1 \/ 6/i)).toBeInTheDocument();

    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    await act(async () => {
      await user.click(screen.getAllByTestId("card")[0]);
    });

    expect(screen.getByText(/high score: 2/i)).toBeInTheDocument();
    expect(screen.getByText(/^score: 1/i)).toBeInTheDocument();
    expect(screen.getByText(/2 \/ 6/i)).toBeInTheDocument();
  });

  it("flips the cards on click", async () => {
    render(<GameplayScreen difficulty="easy" />);

    const checkCards = async () => {
      screen.getAllByTestId("card").forEach((card) => {
        expect(card).toHaveAccessibleName("flipped");
      });
      await act(() => vi.advanceTimersByTime(1000));
      screen.getAllByTestId("card").forEach((card) => {
        expect(card).not.toHaveAccessibleName("flipped");
      });
    };
    await checkCards();

    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    await act(async () => {
      await user.click(screen.getAllByTestId("card")[0]);
    });

    await checkCards();
  });

  it("handles winning the game properly", async () => {
    const clickedCards: number[] = [];
    const fn = vi.fn();

    render(<GameplayScreen difficulty="easy" onGameOver={fn} />);
    await act(() => vi.advanceTimersByTime(2000));

    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    const handleClick = async () => {
      const cards = screen.getAllByTestId("card");
      const unclickedCard = cards.find(
        (card) =>
          card.textContent &&
          !clickedCards.includes(parseInt(card.dataset.id || "-1", 10)),
      );

      if (unclickedCard) {
        await user.click(unclickedCard);
        clickedCards.push(parseInt(unclickedCard.dataset.id || "-1", 10));
      }
    };

    for (let i = 0; i < 6; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await act(async () => {
        await handleClick();
        vi.advanceTimersByTime(1000);
      });
    }

    expect(clickedCards).not.toContain(-1);
    expect(clickedCards).toHaveLength(6);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(true);
  });

  it("handles losing the game properly", async () => {
    const clickedCards: number[] = [];
    const fn = vi.fn();

    render(<GameplayScreen difficulty="easy" onGameOver={fn} />);
    await act(() => vi.advanceTimersByTime(1000));

    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    const handleClick = async () => {
      const cards = screen.getAllByTestId("card");
      const clickedCard =
        cards.find(
          (card) =>
            card.textContent &&
            clickedCards.includes(parseInt(card.dataset.id || "-1", 10)),
        ) || cards[0];

      await user.click(clickedCard);
      clickedCards.push(parseInt(clickedCard.dataset.id || "-1", 10));
    };

    while (screen.queryAllByTestId("card").length > 0) {
      // eslint-disable-next-line no-await-in-loop
      await act(async () => {
        await handleClick();
        vi.advanceTimersByTime(1000);
      });
    }

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(false);
  });

  it("restarts the game on logo click", async () => {
    const fn = vi.fn();
    render(<GameplayScreen difficulty="easy" onRestart={fn} />);

    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    await act(async () => {
      await user.click(screen.getByTestId("btn-logo"));
    });

    expect(fn).toHaveBeenCalledTimes(1);
  });
});
