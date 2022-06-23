import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";

import CONSTANTS from "../../../constants";

import ShowCase from "../ShowCase";
import { cardsSuccessRespone } from "./cardsResponseMocks";

const cardsApiUrl = `${CONSTANTS.API_BASE_URL}/cards`;

const server = setupServer(
  rest.get(cardsApiUrl, (req, res, ctx) => {
    return res(ctx.json(cardsSuccessRespone));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders a card list with 25 items", async () => {
  render(<ShowCase />);

  const cards = await screen.findAllByTestId("card-front");
  expect(cards).toHaveLength(25);
});

test("renders a loading state", async () => {
  // TODO: move this into CardListTest
  render(<ShowCase />);

  await waitFor(() => screen.findByText(/Loading cards.../i));
});
