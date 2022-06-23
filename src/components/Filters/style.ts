import styled from "styled-components";

const FilterLabel = styled.p`
  font-weight: bold;
  margin-right: 10px;
`;

interface ColorFilterProps {
  readonly isActive: boolean;
}

const ColorFilter = styled.button<ColorFilterProps>`
  background-color: ${(props) => (props.isActive ? "#484035" : "#fff")};
  border-radius 15px;
  color: ${(props) => (props.isActive ? "#fff" : "#484035")};
  padding: 5px 7px;
  margin-right: 10px;
`;

interface ColorFilterModeProps {
  readonly isActive: boolean;
  readonly position: "left" | "right";
}

const ColorFilterMode = styled.button<ColorFilterModeProps>`
  background-color: ${(props) => (props.isActive ? "#484035" : "#fff")};
  color: ${(props) => (props.isActive ? "#fff" : "#484035")};
  ${(props) => props.position === "left" && "border-radius: 15px 0 0 15px;"}
  ${(props) => props.position === "right" && "border-radius: 0 15px 15px 0;"}

  &[disabled] {
    cursor: default;
    opacity: 0.2;
  }
`;

const NameFilter = styled.input`
  border-radius: 20px;
  padding: 10px;
`;

export { ColorFilter, ColorFilterMode, FilterLabel, NameFilter };
