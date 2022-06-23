import "@testing-library/jest-dom";

import { buildFilterQuery, updateColorFilter } from "../utils";

describe("buildFilterQuery", () => {
  test("returns a filter string with the given parameters", () => {
    expect(
      buildFilterQuery(["red", "blue"], "|", "Harry,Hermione|Ron")
    ).toEqual("name=Harry,Hermione|Ron&colors=red|blue");
  });
});

describe("updateColorFilter", () => {
  test("adds a color to the existing filter when it is not active", () => {
    expect(updateColorFilter(["red", "black"], "blue", false)).toEqual([
      "red",
      "black",
      "blue",
    ]);
  });

  test("removes a color from the existing filter when it is active", () => {
    expect(updateColorFilter(["red", "black", "blue"], "black", true)).toEqual([
      "red",
      "blue",
    ]);
  });
});
