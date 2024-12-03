import { describe, expect } from "vitest";
import {
  getBackCard,
  getCardById,
  getCards,
  getNextRoundCards,
} from "../cardManager";
// import Card from "../../types/Card";

const CARDS_LENGTH = 20;

describe("cardManager", () => {
  describe("getCards", () => {
    it("returns proper length of cards", () => {
      // NOTE: Update the test if the number of cards changes
      expect(getCards()).toHaveLength(CARDS_LENGTH);
    });

    it("returns valid cards", () => {
      getCards().forEach((card) => {
        expect(card.name).not.toEqual("");
        expect(card.images.webp).not.toEqual("");
        expect(card.images.jpg).not.toEqual("");
      });
    });
  });

  describe("getNextRoundCards", () => {
    it("returns array of cards with specified length", () => {
      expect(getNextRoundCards([], 4)).toHaveLength(4);
    });

    it("handles when there are no clicked cards", () => {
      const clickedCards: number[] = [];
      const newCards = getNextRoundCards(clickedCards, 4);

      newCards.forEach((card) => {
        expect(clickedCards).not.toContain(card.id);
      });
    });

    it("includes 1 card to 25% of clicked cards randomly", () => {
      const clickedCards = [0, 1, 2];
      const newCards = getNextRoundCards(clickedCards, 8);

      const clickedCount = newCards.filter((card) =>
        clickedCards.includes(card.id),
      ).length;

      expect(clickedCount).toBeLessThanOrEqual(2);
      expect(clickedCount).toBeGreaterThanOrEqual(1);
    });

    it("includes more clicked cards if number of remaining cards deficient", () => {
      const clickedCards: number[] = [];
      const remainingCardsCount = 3;

      for (let i = 0; i < CARDS_LENGTH - remainingCardsCount; i += 1) {
        clickedCards.push(i);
      }

      const newCards = getNextRoundCards(clickedCards, 8);

      expect(newCards).toHaveLength(8);
      expect(
        newCards.filter((card) => !clickedCards.includes(card.id)),
      ).toHaveLength(remainingCardsCount);
    });

    it("returns only clicked cards if there are no remaining cards", () => {
      const clickedCards: number[] = [];
      for (let i = 0; i < CARDS_LENGTH; i += 1) clickedCards.push(i);

      const newCards = getNextRoundCards(clickedCards, 8);

      expect(newCards).toHaveLength(8);
      expect(
        newCards.filter((card) => !clickedCards.includes(card.id)),
      ).toHaveLength(0);
    });

    it("does not return undefined cards", () => {
      const clickedCards = [0, 1, 2];
      const newCards = getNextRoundCards(clickedCards, 8);

      newCards.forEach((card) => {
        expect(card).toBeDefined();
        expect(card.id).toBeDefined();
      });
    });
  });

  describe("getCardById", () => {
    it("returns a proper card from id", () => {
      const back = getCardById(0);

      expect(back).toBeDefined();
      expect(back!.name).toBe("Angoulême");
    });
  });

  describe("getBackCard", () => {
    it("returns the back card properly", () => {
      const back = getBackCard();

      expect(back).toBeDefined();
      expect(back!.name).toBe("Back");
    });
  });
});
