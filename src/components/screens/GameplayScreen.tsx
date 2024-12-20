/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from "react";
import LogoButton from "@/Components/buttons/LogoButton";
import Scoreboard from "@/Components/Scoreboard";
import CardContainer from "@/Components/CardContainer";
import { getNextRoundCards } from "../../managers/cardManager";
import Difficulty from "../../types/Difficulty";
import Card from "../../types/Card";

interface Props {
  highScore?: number;
  difficulty: Difficulty;
  onRestart?: () => void;
  onGameOver?: (win?: boolean) => void;
  onUpdateHighScore?: (score?: number) => void;
}

const GameplayScreen: React.FC<Props> = ({
  highScore = 0,
  difficulty,
  onRestart = () => {},
  onGameOver = () => {},
  onUpdateHighScore = () => {},
}) => {
  const [flipped, setFlipped] = useState(true);

  const [clickedCards, setClickedCards] = useState<number[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [cardsSize, setCardsSize] = useState(0);

  const [round, setRound] = useState(1);
  const [maxRounds, setMaxRounds] = useState(0);

  const [score, setScore] = useState(0);

  const reset = () => {
    setMaxRounds(0);
    setRound(1);
    setScore(0);
    setCardsSize(0);
    setCards([]);
    setClickedCards([]);
  };

  const gameOver = (win: boolean) => {
    reset();
    onGameOver(win);
  };

  const updateHighScore = (newScore: number) => {
    onUpdateHighScore(newScore);
  };

  const handleCardClick = (id?: number) => {
    if (id === undefined) return;
    setFlipped(true);

    if (clickedCards.includes(id)) {
      gameOver(false);
      return;
    }

    const newScore = score + 1;
    setScore(newScore);

    if (newScore > highScore) {
      updateHighScore(newScore);
    }

    if (round >= maxRounds) {
      gameOver(true);
      return;
    }

    const newClickedCards = [...clickedCards, id];
    const nextRoundCards = getNextRoundCards(newClickedCards, cardsSize);

    setClickedCards(newClickedCards);
    setTimeout(() => {
      setCards(nextRoundCards);
    }, 650);
    setRound((prevRound) => prevRound + 1);
  };

  useEffect(() => {
    const newCardsSize =
      difficulty === "hard" ? 8 : difficulty === "medium" ? 6 : 4;
    const nextRoundCards = getNextRoundCards([], newCardsSize);

    setCardsSize(newCardsSize);
    setCards(nextRoundCards);

    setMaxRounds(difficulty === "hard" ? 10 : difficulty === "medium" ? 8 : 6);
  }, [difficulty]);

  useEffect(() => {
    if (!flipped) return () => {};

    const timeout = setTimeout(() => {
      setFlipped(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [flipped, round]);

  return (
    <div className="gameplay">
      <header className="gameplay-header">
        <LogoButton onClick={onRestart} />
        <Scoreboard score={score} highScore={highScore} />
      </header>
      <div className="gameplay-main">
        <CardContainer
          cards={cards}
          flipped={flipped}
          onClick={handleCardClick}
        />
        <div className="gameplay-round">
          {round} / {maxRounds}
        </div>
      </div>
    </div>
  );
};

export default GameplayScreen;
