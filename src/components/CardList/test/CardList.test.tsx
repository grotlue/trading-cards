import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import CardList from "../CardList";

const cardReponse = [
  { name: "Test Card 1", id: "1234", imageUrl: "/testImage1.png" },
  { name: "Test Card 2", id: "23", imageUrl: "/testImage2.png" },
];

test("renders the cardReponse properly", async () => {
  render(<CardList isLoaded={true} error={null} cardReponse={cardReponse} />);

  await waitFor(() => screen.findByText(/Test Card 1/i));
  await waitFor(() => screen.findByText(/Test Card 2/i));
});

test("renders the loading state when isLoaded=false", async () => {
  render(<CardList isLoaded={false} error={null} cardReponse={[]} />);

  await waitFor(() => screen.findByText(/Loading cards.../i));
});

test("renders the error message when error is set", async () => {
  render(
    <CardList isLoaded={true} error={{ message: "Oh no!" }} cardReponse={[]} />
  );

  await waitFor(() => screen.findByText(/Oh no!/i));
});
