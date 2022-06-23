import React, {
  useEffect,
  useRef,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

import CONSTANTS from "../../constants";

import { FlexContainer } from "../Layout";
import {
  ColorFilterButton,
  ColorFilterModeButton,
  NameFilterInput,
  FilterLabel,
} from "./style";
import { buildFilterQuery, updateColorFilter } from "./utils";

import type { NameFilter, ColorFilter, ColorFilterMode } from "./types";

interface FiltersProps {
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setFilterQuery: Dispatch<SetStateAction<string>>;
}

const Filters = ({ setCurrentPage, setFilterQuery }: FiltersProps) => {
  const initialRender = useRef(true);

  const [colorFilter, setColorFilter] = useState<ColorFilter>([]);
  const [colorFilterMode, setColorFilterMode] = useState<ColorFilterMode>(
    CONSTANTS.CARDS.DEFAULT_COLOR_FILTER_MODE
  );
  const [nameFilterInput, setNameFilterInput] = useState<string>("");
  const [nameFilter, setNameFilter] = useState<NameFilter>("");

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      setCurrentPage(1);
      setFilterQuery(
        buildFilterQuery(colorFilter, colorFilterMode, nameFilter)
      );
    }
  }, [colorFilter, colorFilterMode, nameFilter]);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      const timeOutId = setTimeout(() => setNameFilter(nameFilterInput), 1000);
      return () => clearTimeout(timeOutId);
    }
  }, [nameFilterInput]);

  const enableColorFilterMode = colorFilter.length > 1;

  return (
    <React.Fragment>
      <FlexContainer
        type="column"
        vCenter
        marginTop={5}
        marginBottom={5}
        marginLeft={10}
        marginRight={10}
      >
        <FilterLabel htmlFor="name-filter">Filter by name(s):</FilterLabel>
        <NameFilterInput
          id="name-filter"
          data-testid="name-filter"
          aria-label="name-filter"
          type="text"
          onChange={(event) => setNameFilterInput(event.target.value)}
          placeholder="e.g. nissa,jace|ajani,caller"
          value={nameFilterInput}
          size={30}
        />
      </FlexContainer>
      <FlexContainer
        type="column"
        vCenter
        marginTop={5}
        marginBottom={5}
        marginLeft={10}
      >
        <FilterLabel>Filter by colour:</FilterLabel>
        {CONSTANTS.CARDS.COLORS.map((color) => {
          const filterActive = !!colorFilter.find((ele) => ele === color);
          return (
            <ColorFilterButton
              data-testid={`color-filter-${color}`}
              isActive={filterActive}
              key={color}
              onClick={() =>
                setColorFilter(
                  updateColorFilter(colorFilter, color, filterActive)
                )
              }
            >
              {color}
            </ColorFilterButton>
          );
        })}
      </FlexContainer>
      <FlexContainer
        type="column"
        vCenter
        marginTop={5}
        marginBottom={5}
        marginLeft={10}
        marginRight={10}
      >
        <FilterLabel>Colour filter mode:</FilterLabel>
        {CONSTANTS.CARDS.COLOR_FILTER_MODES.map((mode, index) => {
          const filterActive = colorFilterMode === mode.queryValue;

          const position = index === 0 ? "left" : "right";

          return (
            <ColorFilterModeButton
              data-testid={`color-filter-mode-${mode.name}`}
              isActive={filterActive}
              position={position}
              disabled={!enableColorFilterMode}
              key={mode.name}
              onClick={() => setColorFilterMode(mode.queryValue)}
            >
              {mode.name}
            </ColorFilterModeButton>
          );
        })}
      </FlexContainer>
    </React.Fragment>
  );
};

export default Filters;
