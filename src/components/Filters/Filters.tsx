import React, {
  useEffect,
  useRef,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

import CONSTANTS from "../../constants";

import { FlexContainer } from "../Layout";

import { ColorFilter, ColorFilterMode, NameFilter, FilterLabel } from "./style";

import type { FilterModeType } from "../../types";

interface FiltersProps {
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setFilterQuery: Dispatch<SetStateAction<string>>;
}

const Filters = ({ setCurrentPage, setFilterQuery }: FiltersProps) => {
  const initialRender = useRef(true);

  const [colorFilter, setColorFilter] = useState<Array<string> | []>([]);
  const [colorFilterMode, setColorFilterMode] = useState<FilterModeType>(
    CONSTANTS.CARDS.DEFAULT_COLOR_FILTER_MODE
  );
  const [nameFilterInput, setNameFilterInput] = useState<string>("");
  const [nameFilter, setNameFilter] = useState<string>("");

  const buildFilterQuery = () => {
    setFilterQuery(
      `name=${nameFilter}&colors=${colorFilter.join(colorFilterMode)}`
    );
  };

  const updateColorFilter = (filterActive: boolean, color: string) => {
    let newColorFilter: Array<string> | [];
    if (filterActive) {
      newColorFilter = colorFilter.filter((item) => item !== color);
    } else {
      newColorFilter = [...colorFilter, color];
    }

    setColorFilter(newColorFilter);
  };

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      setCurrentPage(1);
      buildFilterQuery();
    }
  }, [colorFilter, colorFilterMode, nameFilter]);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      const timeOutId = setTimeout(() => setNameFilter(nameFilterInput), 500);
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
        <FilterLabel>Filter by name(s):</FilterLabel>
        <NameFilter
          onChange={(event) => setNameFilterInput(event.target.value)}
          placeholder="e.g. nissa,jace|ajani,caller"
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
            <ColorFilter
              isActive={filterActive}
              key={color}
              onClick={() => updateColorFilter(filterActive, color)}
            >
              {color}
            </ColorFilter>
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
            <ColorFilterMode
              isActive={filterActive}
              position={position}
              disabled={!enableColorFilterMode}
              key={mode.queryValue}
              onClick={() => setColorFilterMode(mode.queryValue)}
            >
              {mode.name}
            </ColorFilterMode>
          );
        })}
      </FlexContainer>
    </React.Fragment>
  );
};

export default Filters;
