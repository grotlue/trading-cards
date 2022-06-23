import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Filters from "../Filters";

import { buildFilterQuery, updateColorFilter } from "../utils";
jest.mock("../utils", () => ({
  buildFilterQuery: jest.fn(),
  updateColorFilter: jest.fn(),
}));

const setCurrentPageMock = jest.fn();
const setFilterQueryMock = jest.fn();

const setupComp = () => (
  <Filters
    setCurrentPage={setCurrentPageMock}
    setFilterQuery={setFilterQueryMock}
  />
);

beforeEach(() => {
  (buildFilterQuery as jest.Mock).mockReturnValue("name=&colors=");

  (updateColorFilter as jest.Mock).mockReturnValue([]);
});

afterEach(() => {
  jest.resetAllMocks();
});

test("renders all filters", async () => {
  render(setupComp());

  const nameFilterLabel = await screen.findByText(/Filter by name/i);
  const colorFilterLabel = await screen.findByText(/Filter by colour/i);
  const colorFilterModeLabel = await screen.findByText(/Colour filter mode/i);

  expect(nameFilterLabel).toBeInTheDocument();
  expect(colorFilterLabel).toBeInTheDocument();
  expect(colorFilterModeLabel).toBeInTheDocument();
});

describe("colorFilter", () => {
  test("onClick calls updateColorFilter with correct params", async () => {
    render(setupComp());

    const colorFilterButton = await screen.findByTestId("color-filter-black");

    fireEvent.click(colorFilterButton);
    expect(updateColorFilter).toHaveBeenCalledWith([], "black", false);
  });

  test("onClick triggers buildFilterQuery call", async () => {
    render(setupComp());

    const colorFilterButton = await screen.findByTestId("color-filter-black");

    fireEvent.click(colorFilterButton);
    expect(buildFilterQuery).toHaveBeenCalledWith([], ",", "");
  });
});

describe("colorModeFilter", () => {
  test("onClick triggers buildFilterQuery call", async () => {
    render(setupComp());

    const colorFilterBlackButton = await screen.findByTestId(
      "color-filter-black"
    );
    const colorFilterRedButton = await screen.findByTestId("color-filter-red");
    const colorFilterModeButton = await screen.findByTestId(
      "color-filter-mode-or"
    );

    fireEvent.click(colorFilterBlackButton);
    fireEvent.click(colorFilterRedButton);

    fireEvent.click(colorFilterModeButton);
    expect(buildFilterQuery).toHaveBeenCalledWith([], ",", "");
  });

  test("is disabled by default", async () => {
    render(setupComp());

    const colorFilterModeButton = await screen.findByTestId(
      "color-filter-mode-or"
    );

    expect(colorFilterModeButton).toHaveAttribute("disabled");
  });

  test("is disabled when only one colour is selected", async () => {
    render(setupComp());

    const colorFilterBlackButton = await screen.findByTestId(
      "color-filter-black"
    );
    const colorFilterModeButton = await screen.findByTestId(
      "color-filter-mode-or"
    );

    fireEvent.click(colorFilterBlackButton);

    expect(colorFilterModeButton).toHaveAttribute("disabled");
  });
});

describe("nameFilter", () => {
  test("onChange updates the input value", async () => {
    render(setupComp());

    const nameFilter = await screen.getByLabelText("name-filter");
    fireEvent.change(nameFilter, { target: { value: "Harry" } });

    expect((nameFilter as HTMLInputElement).value).toBe("Harry");
  });
});
