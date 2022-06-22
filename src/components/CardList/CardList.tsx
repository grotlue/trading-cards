import React from "react";

import Card from "../Card";

import type { CardResponse, CardResultError } from "../CardShowCase";

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
      <React.Fragment>
        {cardReponse.map((card) => {
          return (
            <Card key={card.id} name={card.name} imageUrl={card.imageUrl} />
          );
        })}
      </React.Fragment>
    );
  }
};

export default CardList;
