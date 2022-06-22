import React, {
  useEffect,
  useRef,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

import CONSTANTS from "../../constants";
import ColorFilter from "./ColorFilter";
import ColorFilterMode from "./ColorFilterMode";
import NameFilter from "./NameFilter";

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

  return (
    <React.Fragment>
      <NameFilter
        onChange={(event) => setNameFilterInput(event.target.value)} // Todo add timeout
      />

      {CONSTANTS.CARDS.COLOR_FILTER_MODES.map((mode) => {
        const filterActive = colorFilterMode === mode.queryValue;

        return (
          <ColorFilterMode
            isActive={filterActive}
            key={mode.queryValue}
            onClick={() => setColorFilterMode(mode.queryValue)}
          >
            {mode.name}
          </ColorFilterMode>
        );
      })}

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
    </React.Fragment>
  );
};

export default Filters;
