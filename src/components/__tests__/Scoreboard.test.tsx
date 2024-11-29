import { describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Scoreboard from "@/Components/Scoreboard";

describe("<Scoreboard />", () => {
  it("renders correctly", () => {
    render(<Scoreboard score={0} highScore={20} />);

    expect(screen.getByText(/high score: 20/i)).toBeInTheDocument();
    expect(screen.getByText(/score: 0/i)).toBeInTheDocument();
  });
});
