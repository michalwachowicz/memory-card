import React from "react";
import { getResult } from "../../managers/gameResultManager";

interface Props {
  result?: "victory" | "defeat";
  onRestart?: () => void;
}

const ResultScreen: React.FC<Props> = ({
  result = "victory",
  onRestart = () => {},
}) => {
  const { webp, png } = getResult(result);

  return (
    <div className="result">
      <picture>
        <source src={webp} type="image/webp" />
        <source src={png} type="image/png" />
        <img
          className="result-img"
          src={png}
          alt={result === "defeat" ? "Defeat" : "Victory"}
        />
      </picture>
      <button
        className="btn btn-game btn-result"
        type="button"
        onClick={onRestart}
      >
        <div className="btn-inner">Restart</div>
      </button>
    </div>
  );
};

export default ResultScreen;
