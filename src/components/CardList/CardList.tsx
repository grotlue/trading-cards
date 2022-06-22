import React from "react";
import styled from "styled-components";

import Card from "./Card";

import type { CardResponse, CardResultError } from "../CardShowCase";

const CardListWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

interface CardProps {
  cardReponse: CardResponse;
  error: CardResultError;
  isLoaded: boolean;
}

const CardList = ({ error, isLoaded, cardReponse }: CardProps) => {
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <CardListWrapper>
        {cardReponse.map((card) => {
          return (
            <Card
              key={card.id}
              id={card.id}
              name={card.name}
              imageUrl={card.imageUrl}
            />
          );
        })}
      </CardListWrapper>
    );
  }
};

export default CardList;
