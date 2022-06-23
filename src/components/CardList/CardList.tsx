import React from "react";

import Card from "../Card";

import type { ResponseError, ResponseResult } from "../ShowCase";

interface CardProps {
  cardReponse: ResponseResult;
  error: ResponseError;
  isLoaded: boolean;
}

const CardList = ({ error, isLoaded, cardReponse }: CardProps) => {
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading cards...</div>;
  } else {
    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  }
};

export default CardList;
