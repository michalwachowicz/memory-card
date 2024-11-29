import { describe, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import CardButton from "@/Components/buttons/CardButton";

vi.mock("../../../managers/cardManager", () => ({
  getBackCard: vi.fn(() => ({
    name: "Back",
    images: { webp: "back.webp", jpg: "back.jpg" },
  })),
}));

describe("<CardButton />", () => {
  const mockCard = {
    id: 0,
    name: "Test",
    images: { webp: "test.webp", jpg: "test.jpg" },
  };

  it("renders correctly with front and back images", () => {
    render(<CardButton data={mockCard} />);

    expect(screen.getByAltText("Back card")).toBeInTheDocument();
    expect(screen.getByAltText("Test card")).toBeInTheDocument();
  });

  it("does not have flipped class when not flipped", () => {
    render(<CardButton data={mockCard} />);
    const wrapper = screen.getByRole("button");

    expect(wrapper).not.toHaveClass("card-wrapper-flipped");
  });

  it("applies the flipped class when flipped", () => {
    render(<CardButton data={mockCard} flipped />);
    const wrapper = screen.getByRole("button");

    expect(wrapper).toHaveClass("card-wrapper-flipped");
  });

  it("tilts the card on mouse move", () => {
    render(<CardButton data={mockCard} />);
    const card = screen.getByTestId("card");

    fireEvent.mouseMove(card, { clientX: 100, clientY: 100 });

    expect(card.style.transform).not.toEqual(
      "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
    );
    expect(card.style.transform).toContain("rotateX");
    expect(card.style.transform).toContain("rotateY");
  });

  it("resets the card tilt on mouse out", () => {
    render(<CardButton data={mockCard} />);
    const card = screen.getByTestId("card");

    fireEvent.mouseMove(card, { clientX: 100, clientY: 100 });
    fireEvent.mouseOut(card);

    expect(card.style.transform).toEqual(
      "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
    );
  });

  it("calls onClick handler on click", async () => {
    const fn = vi.fn();
    render(<CardButton data={mockCard} onClick={fn} />);

    const user = userEvent.setup();
    await user.click(screen.getByRole("button"));

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(0);
  });

  it("block onClick when button is flipped", async () => {
    const fn = vi.fn();
    render(<CardButton data={mockCard} onClick={fn} flipped />);

    const user = userEvent.setup();
    await user.click(screen.getByRole("button"));

    expect(fn).toHaveBeenCalledTimes(0);
  });
});
