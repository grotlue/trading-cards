import React, { useState } from "react";

import { FlexContainer } from "../../Layout";
import CardDetail from "./CardDetail";
import { CardImage, CardName, CardWrapper } from "./style";

interface CardProps {
  name: string;
  id: string;
  imageUrl: string;
}

enum CardDetails {
  manaCost = "Mana Cost",
  power = "Power",
  rarity = "Rarity",
}

type CardDetailsKeys = keyof typeof CardDetails;
type CardDetailsKeyFields = {
  [key in CardDetailsKeys]: string | number | boolean;
};

interface CardType extends CardDetailsKeyFields, CardProps {
  manaCost: string;
  power: string;
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
      {showDetails && !isLoaded && (
        <FlexContainer
          data-testid="card-loading"
          flex={1}
          hCenter
          paddingBottom={20}
          paddingLeft={25}
          paddingRight={25}
          paddingTop={20}
          type="row"
          vCenter
        >
          Loading card details...
        </FlexContainer>
      )}
      {showDetails && error && (
        <FlexContainer
          data-testid="card-error"
          flex={1}
          hCenter
          paddingBottom={20}
          paddingLeft={25}
          paddingRight={25}
          paddingTop={20}
          type="row"
          vCenter
        >
          Error: {error.message}
        </FlexContainer>
      )}
      {showDetails && card && (
        <FlexContainer
          flex={1}
          type="row"
          paddingTop={20}
          paddingBottom={20}
          data-testid="card-back"
        >
          {Object.keys(CardDetails).map(
            (detail) =>
              card[detail as CardDetailsKeys] && (
                <FlexContainer type="column">
                  <CardDetail
                    label={CardDetails[detail as CardDetailsKeys]}
                    value={card[detail as CardDetailsKeys]}
                  />
                </FlexContainer>
              )
          )}
        </FlexContainer>
      )}

      {!showDetails && (
        <FlexContainer
          data-testid="card-front"
          flex={1}
          hCenter
          paddingBottom={20}
          paddingTop={20}
          type="row"
          vCenter
        >
          <FlexContainer type="row">
            <CardImage src={imageUrl} />
          </FlexContainer>
        </FlexContainer>
      )}
      <CardName>{name}</CardName>
    </CardWrapper>
  );
};

export default Card;
