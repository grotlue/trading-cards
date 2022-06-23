import type { CardColor, FilterMode } from "../../types";

type NameFilter = string;
type ColorFilter = Array<CardColor> | [];
type ColorFilterMode = FilterMode;

export type { ColorFilter, ColorFilterMode, NameFilter };
