import React, { useLayoutEffect, useRef, useState } from "react";
import Card from "../../types/Card";
import { getBackCard } from "../../managers/cardManager";

interface Props {
  data: Card;
  flipped?: boolean;
  onClick?: (id: number) => void;
}

const CardPicture = ({ data }: { data: Card }) => (
  <picture>
    <source src={data.images.webp} type="image/webp" />
    <source src={data.images.jpg} type="image/jpg" />
    <img src={data.images.jpg} alt={`${data.name} card`} />
  </picture>
);

const CardButton: React.FC<Props> = ({
  data,
  flipped = false,
  onClick = () => {},
}) => {
  const [size, setSize] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const clickHandler = () => {
    if (flipped) return;
    onClick(data.id);
  };

  useLayoutEffect(() => {
    const updateSize = () => {
      if (!cardRef.current) return;

      const { top, left, width, height } =
        cardRef.current.getBoundingClientRect();

      setSize({ top, left, width, height });
    };

    updateSize();

    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [cardRef]);

  useLayoutEffect(() => {
    const { current } = cardRef;
    if (!current) return () => {};

    const tiltCard = (e: MouseEvent) => {
      const { top, left, width, height } = size;
      const { clientX, clientY } = e;

      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;

      const normalizedX = distanceX / (width / 2);
      const normalizedY = distanceY / (height / 2);

      const tiltX = normalizedY * (flipped ? -15 : 15);
      const tiltY = normalizedX * (flipped ? 15 : -15);

      current.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1, 1, 1)`;
    };

    current.addEventListener("mousemove", tiltCard);
    return () => current.removeEventListener("mousemove", tiltCard);
  }, [flipped, size, cardRef]);

  useLayoutEffect(() => {
    const { current } = cardRef;
    if (!current) return () => {};

    const resetCardTilt = () => {
      current.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    };

    current.addEventListener("mouseout", resetCardTilt);
    return () => current.removeEventListener("mouseout", resetCardTilt);
  }, [cardRef]);

  return (
    <button
      type="button"
      className={`card-wrapper ${flipped ? "card-wrapper-flipped" : ""}`}
      onClick={clickHandler}
    >
      <div ref={cardRef} className="card" data-testid="card">
        <div className="card-back">
          <CardPicture data={getBackCard()} />
        </div>
        <div className="card-front">
          <div className="card-front-img">
            <CardPicture data={data} />
          </div>
          <div className="card-name">{data.name}</div>
        </div>
      </div>
    </button>
  );
};

export default CardButton;
