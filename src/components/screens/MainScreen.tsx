import React from "react";
import GameButton from "@/Components/buttons/GameButton";
import Logo from "@/Assets/images/logo/logo.svg?react";

const MainScreen: React.FC = () => (
  <div className="main">
    <Logo className="main-logo" aria-label="The Witcher Logo" />
    <div className="main-btns">
      <GameButton label="Easy" difficulty="easy" />
      <GameButton label="Medium" difficulty="medium" />
      <GameButton label="Hard" difficulty="hard" />
    </div>
  </div>
);

export default MainScreen;
