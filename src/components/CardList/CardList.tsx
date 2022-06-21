import React, { useEffect, useState } from "react";

import Card from "../Card";
import CONSTANTS from "../../constants";

type CardResult = {
  id: string;
  name: string;
  imageUrl: string;
};

const CardList = () => {
  const [error, setError] = useState<{ message: string } | null>(null);
  useState<Array<CardResult> | []>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [cards, setCards] = useState<Array<CardResult> | []>([]);

  useEffect(() => {
    fetch(
      `https://api.magicthegathering.io/v1/cards?pageSize=${CONSTANTS.CARDS.PAGE_SIZE}&contains=imageUrl`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCards(result.cards);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <React.Fragment>
        {cards.map((card) => {
          return (
            <Card key={card.id} name={card.name} imageUrl={card.imageUrl} />
          );
        })}
      </React.Fragment>
    );
  }
};

export default CardList;
