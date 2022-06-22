import React, { useState } from "react";

interface CardProps {
  name: string;
  id: string;
  imageUrl: string;
}

interface CardType extends CardProps {
  manaCost: string;
}

const Card = ({ name, id, imageUrl }: CardProps) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState<{ message: string } | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [card, setCard] = useState<CardType | null>(null);

  const handleCardClick = () => {
    setShowDetails(!showDetails);

    if (card) return;

    isLoaded && setIsLoaded(false);

    fetch(`https://api.magicthegathering.io/v1/cards/${id}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCard(result.card);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  return (
    <div onClick={() => handleCardClick()}>
      <img src={imageUrl} />
      {name}
      {showDetails && !error && isLoaded && card && card.manaCost}
    </div>
  );
};

export default Card;
