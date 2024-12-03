import React, { useEffect, useState } from "react";
import SettingsButtons from "@/Components/buttons/SettingsButtons";
import GameplayScreen from "@/Components/screens/GameplayScreen";
import MainScreen from "@/Components/screens/MainScreen";
import ResultScreen from "@/Components/screens/ResultScreen";
import Difficulty from "../types/Difficulty";

interface Props {
  sound?: boolean;
  onSoundToggle?: (enable?: boolean) => void;
}

const GameWrapper: React.FC<Props> = ({
  sound = false,
  onSoundToggle = () => {},
}) => {
  const [highScore, setHighScore] = useState(0);
  const [result, setResult] = useState<"victory" | "defeat">("victory");
  const [screen, setScreen] = useState<"main" | "game" | "result">("main");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");

  const handleDifficultySelect = (d?: Difficulty) => {
    if (d === undefined) return;

    setDifficulty(d);
    setScreen("game");
  };

  const handleGameOver = (win?: boolean) => {
    if (win === undefined) return;

    setResult(win ? "victory" : "defeat");
    setScreen("result");
  };

  const handleRestart = () => {
    setScreen("main");
  };

  const handleUpdateHighScore = (newScore?: number) => {
    if (newScore === undefined) return;

    localStorage.setItem("highScore", `${newScore}`);
    setHighScore(newScore);
  };

  useEffect(() => {
    setHighScore(parseInt(localStorage.getItem("highScore") || "0", 10));
  }, []);

  return (
    <div className="game-wrapper">
      {screen === "main" && (
        <MainScreen onDifficultySelect={handleDifficultySelect} />
      )}
      {screen === "game" && (
        <GameplayScreen
          highScore={highScore}
          difficulty={difficulty}
          onRestart={handleRestart}
          onGameOver={handleGameOver}
          onUpdateHighScore={handleUpdateHighScore}
        />
      )}
      {screen === "result" && (
        <ResultScreen result={result} onRestart={handleRestart} />
      )}
      {screen !== "result" && (
        <SettingsButtons soundOn={sound} onSoundToggle={onSoundToggle} />
      )}
    </div>
  );
};

export default GameWrapper;
