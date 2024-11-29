import React from "react";

interface Props {
  score: number;
  highScore: number;
}

const Scoreboard: React.FC<Props> = ({ score, highScore }) => (
  <div className="scoreboard">
    <div className="scoreboard-inner">
      <div className="scoreboard-info">High score: {highScore}</div>
      <div className="scoreboard-info">Score: {score}</div>
    </div>
  </div>
);

export default Scoreboard;
