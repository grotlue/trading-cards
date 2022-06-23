import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";

import CONSTANTS from "../../../constants";

import ShowCase from "../ShowCase";
import { cardsSuccessRespone } from "./cardsResponseMocks";

const cardsApiUrl = `${CONSTANTS.API_BASE_URL}/cards`;

const server = setupServer(
  rest.get(cardsApiUrl, (_req, res, ctx) => {
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

test("renders a next page button when the total count is > 25", async () => {
  server.use(
    rest.get(cardsApiUrl, (_req, res, ctx) => {
      return res(ctx.set("total-count", "51"), ctx.json(cardsSuccessRespone));
    })
  );

  render(<ShowCase />);

  await waitFor(() => screen.findByText("Next Page"));
});

test("does not render a next page button when the total count is < 25", async () => {
  server.use(
    rest.get(cardsApiUrl, (_req, res, ctx) => {
      return res(ctx.set("total-count", "24"), ctx.json(cardsSuccessRespone));
    })
  );

  render(<ShowCase />);

  await waitFor(() => expect(screen.queryByText("Next Page")).toBeNull());
});

test("renders a previous page button if current page > 1", async () => {
  server.use(
    rest.get(cardsApiUrl, (_req, res, ctx) => {
      return res(ctx.set("total-count", "51"), ctx.json(cardsSuccessRespone));
    })
  );

  render(<ShowCase />);

  const nextButton = await screen.findByText("Next Page");

  fireEvent.click(nextButton);

  await waitFor(() => screen.findByText("Previous Page"));
});

test("does not render a previous page button if current page == 1", async () => {
  server.use(
    rest.get(cardsApiUrl, (_req, res, ctx) => {
      return res(ctx.set("total-count", "51"), ctx.json(cardsSuccessRespone));
    })
  );

  render(<ShowCase />);

  await waitFor(() => expect(screen.queryByText("Previous Page")).toBeNull());
});
