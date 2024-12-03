import formatModule from "../utils/moduleFormatter";

const webpModules = import.meta.glob(
  "../assets/images/game-results/**/*.webp",
  {
    eager: true,
  },
);
const pngModules = import.meta.glob("../assets/images/game-results/**/*.png", {
  eager: true,
});

interface Result {
  webp: string;
  png: string;
}

const results: { [key: string]: Result } = ["victory", "defeat"].reduce(
  (acc, result) => {
    const webp = formatModule(webpModules, `${result}.webp`);
    const png = formatModule(pngModules, `${result}.png`);

    acc[result] = { webp, png };
    return acc;
  },
  {} as { [key: string]: Result },
);

const getResult = (result: string) => results[result];
const preloadResults = () => {
  Object.values(results).forEach((result) => {
    Object.values(result).forEach((image) => {
      const img = new Image();
      img.src = image;
    });
  });
};

export { getResult, preloadResults };
