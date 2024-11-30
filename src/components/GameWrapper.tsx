import React, { useState } from "react";
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

  return (
    <div className="game-wrapper">
      {screen === "main" && (
        <MainScreen onDifficultySelect={handleDifficultySelect} />
      )}
      {screen === "game" && (
        <GameplayScreen
          difficulty={difficulty}
          onRestart={handleRestart}
          onGameOver={handleGameOver}
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
