import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Card from "../../types/Card";
import CardContainer from "@/Components/CardContainer";

vi.mock("@/Components/buttons/CardButton", () => ({
  default: ({
    data,
    flipped,
    onClick = () => {},
  }: {
    data: Card;
    flipped: boolean;
    onClick?: (id?: number) => void;
  }) => (
    <button type="button" data-testid="card" onClick={() => onClick(data.id)}>
      {!flipped ? data.name : "flipped"}
    </button>
  ),
}));

describe("<CardContainer />", () => {
  const cards: Card[] = [
    { id: 0, name: "Test 1", images: { webp: "", jpg: "" } },
    { id: 1, name: "Test 2", images: { webp: "", jpg: "" } },
    { id: 2, name: "Test 3", images: { webp: "", jpg: "" } },
    { id: 3, name: "Test 3", images: { webp: "", jpg: "" } },
  ];

  it("renders a proper amount of cards", () => {
    render(<CardContainer cards={cards} />);
    expect(screen.getAllByTestId("card")).toHaveLength(4);
  });

  it("renders not flipped cards correctly", () => {
    render(<CardContainer cards={cards} />);
    const renderedCards = screen.getAllByTestId("card");

    for (let i = 0; i < renderedCards.length; i += 1) {
      expect(renderedCards[i]).toHaveAccessibleName(cards[i].name);
    }
  });

  it("renders flipped cards correctly", () => {
    render(<CardContainer cards={cards} flipped />);
    const renderedCards = screen.getAllByTestId("card");

    for (let i = 0; i < renderedCards.length; i += 1) {
      expect(renderedCards[i]).toHaveAccessibleName("flipped");
    }
  });

  it("handles onClick properly", async () => {
    const fn = vi.fn();
    render(<CardContainer cards={cards} onClick={fn} />);

    const renderedCards = screen.getAllByTestId("card");
    const user = userEvent.setup();

    await Promise.all(
      renderedCards.map(async (card, index) => {
        await user.click(card);
        expect(fn).toHaveBeenCalledWith(cards[index].id);
      }),
    );

    expect(fn).toHaveBeenCalledTimes(cards.length);
  });
});
