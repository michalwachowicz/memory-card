import React from "react";

import victoryPng from "@/Assets/images/game-results/victory/victory.png";
import victoryWebp from "@/Assets/images/game-results/victory/victory.webp";

import defeatPng from "@/Assets/images/game-results/defeat/defeat.png";
import defeatWebp from "@/Assets/images/game-results/defeat/defeat.webp";

interface Props {
  result?: "victory" | "defeat";
  onRestart?: () => void;
}

const ResultScreen: React.FC<Props> = ({
  result = "victory",
  onRestart = () => {},
}) => (
  <div className="result">
    <picture>
      <source
        src={result === "defeat" ? defeatWebp : victoryWebp}
        type="image/webp"
      />
      <source
        src={result === "defeat" ? defeatPng : victoryPng}
        type="image/png"
      />
      <img
        className="result-img"
        src={result === "defeat" ? defeatWebp : victoryWebp}
        alt={result === "defeat" ? "Defeat" : "Victory"}
      />
    </picture>
    <button
      className="btn btn-game btn-result"
      type="button"
      onClick={onRestart}
    >
      Restart
    </button>
  </div>
);

export default ResultScreen;
