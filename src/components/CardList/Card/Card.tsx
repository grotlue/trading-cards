import React, { useState } from "react";

import { FlexContainer } from "../../Layout";

import {
  CardDetail,
  CardDetailLabel,
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
          <FlexContainer type="row">
            <FlexContainer type="row" paddingLeft={25} paddingRight={25}>
              <FlexContainer type="column">
                <CardDetailLabel>Mana Cost:</CardDetailLabel>
                <CardDetail>{card.manaCost}</CardDetail>
              </FlexContainer>
            </FlexContainer>
            <FlexContainer type="row" paddingLeft={25} paddingRight={25}>
              <FlexContainer type="column">
                <CardDetailLabel>Rarity:</CardDetailLabel>
                <CardDetail>{card.rarity}</CardDetail>
              </FlexContainer>
            </FlexContainer>
          </FlexContainer>
          <CardName>{name}</CardName>
        </React.Fragment>
      )}

      {!showDetails && (
        <React.Fragment>
          <FlexContainer type="row" hCenter>
            <CardImage src={imageUrl} />
          </FlexContainer>
          <FlexContainer type="row">
            <CardName>{name}</CardName>
          </FlexContainer>
        </React.Fragment>
      )}
    </CardWrapper>
  );
};

export default Card;
