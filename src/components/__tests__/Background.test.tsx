import { describe, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Background from "@/Components/Background";

[
  "@/Assets/images/background",
  "@/Assets/videos/background",
  "@/Assets/audio",
].forEach((path) => vi.mock(path, () => ({ default: "" })));

const getFileName = (url: string) => {
  const values = url.split("/");
  return values[values.length - 1];
};

const expectUrl = (url: string, value: string) => {
  expect(getFileName(url)).toBe(value);
};

describe("<Background />", () => {
  it("renders with the correct opacity", () => {
    render(<Background opacity={0.5} music />);

    const backdrop = screen.getByTestId("backdrop");
    expect(backdrop).toHaveStyle({ opacity: 0.5 });
  });

  it("plays and pauses music based on the music prop", async () => {
    const { rerender } = render(<Background opacity={0.5} music />);
    expect(screen.getByTestId("audio")).toBeInTheDocument();

    rerender(<Background opacity={0.5} music={false} />);
    expect(screen.queryByTestId("audio")).not.toBeInTheDocument();
  });

  it("has proper audio volume", () => {
    render(<Background opacity={0.5} music />);

    const audio = screen.getByTestId("audio") as HTMLAudioElement;
    expect(audio.volume).toBe(0.1);
  });

  it("renders correct video source based on screen size", () => {
    render(<Background opacity={0.5} music />);

    const checkVideoSources = (video: HTMLVideoElement, fileName: string) => {
      expectUrl(video.poster, `${fileName}.jpg`);

      const checkSource = (type: string) => {
        const source: HTMLSourceElement | null = video.querySelector(
          `source[type="${type}"]`,
        );

        expect(source).toBeDefined();
        if (source) expectUrl(source.src, `${fileName}.${type.split("/")[1]}`);
      };

      checkSource("video/webm");
      checkSource("video/mp4");
    };

    const resizeWindow = (width: number, height: number) => {
      [
        { prop: "innerWidth", value: width },
        { prop: "innerHeight", value: height },
      ].forEach(({ prop, value }) =>
        Object.defineProperty(window, prop, {
          configurable: true,
          value,
        }),
      );

      fireEvent.resize(window);
    };

    resizeWindow(1920, 1080);
    checkVideoSources(screen.getByTestId("video"), "background-1080");

    resizeWindow(1280, 720);
    checkVideoSources(screen.getByTestId("video"), "background-720");
  });
});
