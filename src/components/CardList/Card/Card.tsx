import React, { useState } from "react";

import {
  CardDetail,
  CardDetailLabel,
  CardDetailRow,
  CardDetails,
  CardImage,
  CardName,
  CardWrapper,
} from "./StyledCard";

interface CardProps {
  name: string;
  id: string;
  imageUrl: string;
}

interface CardType extends CardProps {
  manaCost: string;
  rarity: string;
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
    <CardWrapper onClick={() => handleCardClick()}>
      {showDetails && !isLoaded && <div>Loading</div>}
      {showDetails && error && <div>Error: {error.message}</div>}
      {showDetails && card && (
        <React.Fragment>
          <CardDetails>
            <CardDetailRow>
              <CardDetailLabel>Mana Cost:</CardDetailLabel>
              <CardDetail>{card.manaCost}</CardDetail>
            </CardDetailRow>
            <CardDetailRow>
              <CardDetailLabel>Rarity:</CardDetailLabel>
              <CardDetail>{card.rarity}</CardDetail>
            </CardDetailRow>
          </CardDetails>
          <CardName>{name}</CardName>
        </React.Fragment>
      )}

      {!showDetails && (
        <React.Fragment>
          <CardDetails>
            <CardImage src={imageUrl} />
          </CardDetails>
          <CardName>{name}</CardName>
        </React.Fragment>
      )}
    </CardWrapper>
  );
};

export default Card;
