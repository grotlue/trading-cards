import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";

import CONSTANTS from "../../../constants";

import Card from "../Card";

import type { CardProps } from "../Card";

const cardApiUrl = `${CONSTANTS.API_BASE_URL}/cards`;

const cardMock: CardProps = {
  name: "Holy Fire",
  id: "1234",
  imageUrl: "test.png",
};

const request = (id = cardMock.id) =>
  rest.get(`${cardApiUrl}/${id}`, (_req, res, ctx) => {
    return res(ctx.json({ ...cardMock }));
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

test("renders the card front by default", async () => {
  render(<Card {...cardMock} />);

  const cardFront = await screen.findByTestId("card-front");
  const cardBack = await screen.queryByTestId("card-back");

  expect(cardFront).toBeInTheDocument();
  expect(cardBack).toBeNull();
});

test("renders the card back with info after click", async () => {
  server.use(request("test"));

  render(<Card {...cardMock} />);

  const cardFront = await screen.findByTestId("card-front");
  fireEvent.click(cardFront);
  const cardInfo = await screen.findByText(/Holy Fire/i);

  const cardFrontRemoved = screen.queryByTestId("card-front");
  expect(cardInfo).toBeInTheDocument();
  expect(cardFrontRemoved).toBeNull();
});
