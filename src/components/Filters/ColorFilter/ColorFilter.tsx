import styled from "styled-components";

interface ColorFilterProps {
  readonly isActive: boolean;
}

const ColorFilter = styled.button<ColorFilterProps>`
  background-color: ${(props) => (props.isActive ? "#484035" : "#fff")};
  color: ${(props) => (props.isActive ? "#fff" : "#484035")};
  cursor: pointer;
  padding: 5px 7px;
  margin-right: 10px;
`;

export default ColorFilter;
