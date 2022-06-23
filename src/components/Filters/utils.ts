import type { CardColor } from "../../types";
import type { NameFilter, ColorFilter, ColorFilterMode } from "./types";

const buildFilterQuery = (
  colorFilter: ColorFilter,
  colorFilterMode: ColorFilterMode,
  nameFilter: NameFilter
) => `name=${nameFilter}&colors=${colorFilter.join(colorFilterMode)}`;

const updateColorFilter = (
  currentColorFilter: ColorFilter,
  currentColor: CardColor,
  currentColorActive: boolean
): ColorFilter => {
  let newColorFilter: ColorFilter;
  if (currentColorActive) {
    newColorFilter = currentColorFilter.filter((item) => item !== currentColor);
  } else {
    newColorFilter = [...currentColorFilter, currentColor];
  }

  return newColorFilter;
};

export { buildFilterQuery, updateColorFilter };
