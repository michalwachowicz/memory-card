import React from "react";
import GameButton from "@/Components/buttons/GameButton";
import Logo from "@/Assets/images/logo/logo.svg?react";
import Difficulty from "../../types/Difficulty";

interface Props {
  onDifficultySelect?: (difficulty?: Difficulty) => void;
}

const MainScreen: React.FC<Props> = ({ onDifficultySelect = () => {} }) => (
  <div className="main">
    <Logo className="main-logo" aria-label="The Witcher Logo" />
    <div className="main-btns">
      <GameButton label="Easy" difficulty="easy" onClick={onDifficultySelect} />
      <GameButton
        label="Medium"
        difficulty="medium"
        onClick={onDifficultySelect}
      />
      <GameButton label="Hard" difficulty="hard" onClick={onDifficultySelect} />
    </div>
  </div>
);

export default MainScreen;
