import Card from "../types/Card";
import cardsJson from "@/Assets/images/cards/cards.json";

const webpModules = import.meta.glob("../assets/images/cards/**/*.webp");
const jpgModules = import.meta.glob("../assets/images/cards/**/*.jpg");

const formatModule = (module: string) => module.replace("../", "/src/");

const getFrom = (
  record: Record<string, () => Promise<unknown>>,
  targetKey: string,
) => Object.keys(record).find((key) => key.endsWith(targetKey));

const { [-1]: backCard, ...cards }: { [id: number]: Card } = cardsJson.reduce(
  (acc, { id, name, path }) => {
    const webp = formatModule(getFrom(webpModules, `${path}.webp`) || "");
    const jpg = formatModule(getFrom(jpgModules, `${path}.jpg`) || "");

    acc[id] = { id, name, images: { webp, jpg } };
    return acc;
  },
  {} as { [id: number]: Card },
);

// Returns number of cards without the back card
const getCards = () => Object.values(cards);

const getBackCard = () => backCard;
const getCardById = (id: number) => cards[id];

const shuffle = (arr: (Card | number)[]) => {
  const copy = [...arr];

  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
};

const getNextRoundCards = (clickedCards: number[], length: number): Card[] => {
  const allCards = getCards();
  const newCards = shuffle(
    clickedCards.length
      ? allCards.filter((card) => !clickedCards.includes(card.id))
      : allCards,
  );

  const selectedClickedCards: Card[] = [];
  if (clickedCards.length > 0) {
    const randomCardsCount =
      newCards.length >= length
        ? Math.floor(Math.random() * (0.25 * clickedCards.length + 1))
        : length - newCards.length;

    const availableClickedCards = [...clickedCards];
    shuffle(availableClickedCards);

    for (let i = 0; i < randomCardsCount; i += 1) {
      selectedClickedCards.push(getCardById(availableClickedCards[i]));
    }
  }

  const finalCards = [...selectedClickedCards, ...newCards].slice(0, length);
  return shuffle(finalCards) as Card[];
};

const preloadCards = () => {
  [backCard, ...getCards()].forEach(({ images }) => {
    Object.values(images).forEach((image) => {
      const img = new Image();
      img.src = image;
    });
  });
};

export { getCards, getNextRoundCards, getBackCard, getCardById, preloadCards };
