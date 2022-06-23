import React, { useEffect, useState } from "react";

import CONSTANTS from "../../constants";

import { FlexContainer } from "../Layout";

import Button from "../Button";
import CardList from "../CardList";
import Filters from "../Filters";

import type { ResponseError, ResponseResult } from "./types";

const ShowCase = () => {
  const [error, setError] = useState<ResponseError>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [cards, setCards] = useState<ResponseResult>([]);
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
      `${CONSTANTS.API_BASE_URL}/cards?contains=imageUrl&pageSize=${CONSTANTS.CARDS.PAGE_SIZE}&page=${currentPage}&${filterQuery}`
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
      <FlexContainer type="row" hCenter marginBottom={25}>
        <FlexContainer type="column" wrapItems>
          <Filters
            data-testid="filters"
            setFilterQuery={setFilterQuery}
            setCurrentPage={setCurrentPage}
          />
        </FlexContainer>
      </FlexContainer>
      <FlexContainer type="row" hCenter marginBottom={25}>
        <FlexContainer type="column">
          {currentPage > 1 && (
            <FlexContainer type="column" marginLeft={5} marginRight={5}>
              <Button onClick={() => setCurrentPage(currentPage - 1)}>
                Previous Page
              </Button>
            </FlexContainer>
          )}
          {totalCount / CONSTANTS.CARDS.PAGE_SIZE > currentPage && (
            <FlexContainer type="column" marginLeft={5} marginRight={5}>
              <Button onClick={() => setCurrentPage(currentPage + 1)}>
                Next Page
              </Button>
            </FlexContainer>
          )}
        </FlexContainer>
      </FlexContainer>
      <FlexContainer type="row" hCenter>
        <FlexContainer type="column" hCenter wrapItems>
          <CardList
            data-testid="card-list"
            isLoaded={isLoaded}
            error={error}
            cardReponse={cards}
          />
        </FlexContainer>
      </FlexContainer>
    </React.Fragment>
  );
};

export default ShowCase;
