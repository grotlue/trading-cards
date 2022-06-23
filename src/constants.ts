import type { CardColorsType, FilterModeType } from "./types";

type ConstantsType = {
  APP_TITLE: string;
  API_BASE_URL: string;
  CARDS: CardConstantsType;
};

type CardConstantsType = {
  COLORS: Array<CardColorsType>;
  DEFAULT_COLOR_FILTER_MODE: FilterModeType;
  COLOR_FILTER_MODES: Array<FilterModeConstantType>;
  PAGE_SIZE: number;
};

type FilterModeConstantType = {
  name: string;
  queryValue: FilterModeType;
};

const CONSTANTS: ConstantsType = {
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
