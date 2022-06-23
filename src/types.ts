type CardColor = "black" | "blue" | "green" | "red" | "white";

type FilterMode = "," | "|";

type Constants = {
  APP_TITLE: string;
  API_BASE_URL: string;
  CARDS: CardConstants;
};

type CardConstants = {
  COLORS: Array<CardColor>;
  DEFAULT_COLOR_FILTER_MODE: FilterMode;
  COLOR_FILTER_MODES: Array<FilterModeMap>;
  PAGE_SIZE: number;
};

type FilterModeMap = {
  name: string;
  queryValue: FilterMode;
};

export type { CardColor, FilterMode, Constants };
