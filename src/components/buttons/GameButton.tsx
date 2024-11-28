import React from "react";
import Difficulty from "@/Assets/src/types/Difficulty";

interface Props {
  label: string;
  difficulty?: Difficulty | undefined;
  onClick?: (difficulty?: Difficulty) => void;
}

const GameButton: React.FC<Props> = ({
  label,
  difficulty = undefined,
  onClick = () => {},
}) => (
  <button
    className="btn btn-game"
    type="button"
    onClick={() => onClick(difficulty)}
  >
    <div className="btn-inner">{label}</div>
  </button>
);

export default GameButton;
