import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";

import CONSTANTS from "../../../constants";

import ShowCase from "../ShowCase";
import { buildResponseResult } from "./mocks";

const cardsApiUrl = `${CONSTANTS.API_BASE_URL}/cards`;

const request = (total = 75, itemCount = 25) =>
  rest.get(cardsApiUrl, (req, res, ctx) => {
    const page = req.url.searchParams.get("page");

    return res(
      ctx.set("total-count", total.toString()),
      ctx.json(buildResponseResult(itemCount, `page-${page}`))
    );
  });

const server = setupServer(request());

beforeAll(() =>
  server.listen({
    onUnhandledRequest(req) {
      console.error(
        "Found an unhandled %s request to %s",
        req.method,
        req.url.href
      );
    },
  })
);
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders a card list with 25 items", async () => {
  render(<ShowCase />);

  const cards = await screen.findAllByTestId("card-front");

  expect(cards).toHaveLength(25);
});

test("renders a next page button when the total count is > 25", async () => {
  server.use(request(26));

  render(<ShowCase />);

  const nextButton = await screen.findByText("Next Page");

  expect(nextButton).toBeInTheDocument();
});

test("does not render a next page button when the total count is < 25", async () => {
  server.use(request(24));

  render(<ShowCase />);

  const nextButton = await screen.queryByText("Next Page");

  expect(nextButton).toBeNull();
});

test("renders a previous page button if current page > 1", async () => {
  render(<ShowCase />);

  const nextButton = await screen.findByText("Next Page");

  fireEvent.click(nextButton);

  const prevButton = await screen.findByText("Previous Page");

  expect(prevButton).toBeInTheDocument();
});

test("does not render a previous page button if current page == 1", async () => {
  render(<ShowCase />);

  const prevButton = await screen.queryByText("Previous Page");
  expect(prevButton).toBeNull();
});

test("renders a previous page button if current page > 1", async () => {
  render(<ShowCase />);

  const nextButton = await screen.findByText("Next Page");
  fireEvent.click(nextButton);

  const prevButton = await screen.findByText("Previous Page");

  expect(prevButton).toBeInTheDocument();
});

test("renders a new page of cards when clicking the next button", async () => {
  render(<ShowCase />);

  const page1Cards = await screen.findAllByText(/page-1/i);
  expect(page1Cards).toHaveLength(25);

  await waitFor(() => expect(screen.queryByText("page-2")).toBeNull());

  const nextButton = await screen.findByText("Next Page");
  fireEvent.click(nextButton);

  const page2Cards = await screen.findAllByText(/page-2/i);

  expect(page2Cards).toHaveLength(25);
});

test("renders a new page of cards when clicking the previous button", async () => {
  render(<ShowCase />);

  const nextButton = await screen.findByText("Next Page");
  fireEvent.click(nextButton);

  const page2Cards = await screen.findAllByText(/page-2/i);
  expect(page2Cards).toHaveLength(25);

  const prevButton = await screen.findByText("Previous Page");
  fireEvent.click(prevButton);

  const page1Cards = await screen.findAllByText(/page-1/i);

  expect(page1Cards).toHaveLength(25);
});
