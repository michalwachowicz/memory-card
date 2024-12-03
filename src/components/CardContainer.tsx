import React from "react";
import Card from "../types/Card";
import CardButton from "@/Components/buttons/CardButton";

interface Props {
  cards: Card[];
  flipped?: boolean;
  onClick?: (id?: number) => void;
}

const CardContainer: React.FC<Props> = ({
  cards,
  flipped = false,
  onClick = () => {},
}) => (
  <div className="card-container">
    {cards.map(
      (card) =>
        card &&
        card.id !== undefined && (
          <CardButton
            data={card}
            key={card.id}
            flipped={flipped}
            onClick={onClick}
          />
        ),
    )}
  </div>
);

export default CardContainer;
