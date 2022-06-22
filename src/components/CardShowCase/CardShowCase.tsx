import React, { useEffect, useState } from "react";

import CONSTANTS from "../../constants";

import CardList from "../CardList";
import Filters from "../Filters";

interface CardItem {
  id: string;
  name: string;
  imageUrl: string;
}

type CardResultError = { message: string } | null;
type CardResponse = Array<CardItem> | [];

const CardShowCase = () => {
  const [error, setError] = useState<CardResultError>(null);
  useState<Array<CardItem> | []>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [cards, setCards] = useState<CardResponse>([]);
  const [filterQuery, setFilterQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const queryVariables: Array<boolean | number | string> | [] = [
    currentPage,
    filterQuery,
  ];

  useEffect(() => {
    isLoaded && setIsLoaded(false);

    fetch(
      `https://api.magicthegathering.io/v1/cards?contains=imageUrl&pageSize=${CONSTANTS.CARDS.PAGE_SIZE}&page=${currentPage}&${filterQuery}`
    )
      .then((res) => {
        const total: string | null = res.headers.get("total-count");

        if (total) {
          setTotalCount(parseInt(total));
        }

        return res.json();
      })
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
  }, queryVariables);

  return (
    <React.Fragment>
      <Filters
        setFilterQuery={setFilterQuery}
        setCurrentPage={setCurrentPage}
      />
      <CardList isLoaded={isLoaded} error={error} cardReponse={cards} />
      {currentPage > 1 && (
        <button onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
      )}
      {totalCount / CONSTANTS.CARDS.PAGE_SIZE > currentPage && (
        <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
      )}
    </React.Fragment>
  );
};

export type { CardResponse, CardResultError };
export default CardShowCase;
