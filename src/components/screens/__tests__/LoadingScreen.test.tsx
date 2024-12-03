import { render, screen } from "@testing-library/react";
import LoadingScreen from "@/Components/screens/LoadingScreen";

describe("<LoadingScreen />", () => {
  it("renders correctly", () => {
    render(<LoadingScreen />);

    expect(screen.getByTestId("loading-icon")).toBeInTheDocument();
    expect(screen.getByText(/loading\.\.\./i)).toBeInTheDocument();
  });
});
