import type { Constants } from "./types";

const CONSTANTS: Constants = {
  APP_TITLE: "Trading Cards",
  API_BASE_URL: "https://api.magicthegathering.io/v1",
  CARDS: {
    COLORS: ["black", "blue", "green", "red", "white"],
    DEFAULT_COLOR_FILTER_MODE: ",",
    COLOR_FILTER_MODES: [
      {
        name: "and",
        queryValue: ",",
      },
      {
        name: "or",
        queryValue: "|",
      },
    ],
    PAGE_SIZE: 25,
  },
};

export default CONSTANTS;
