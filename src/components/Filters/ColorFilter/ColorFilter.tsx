import styled from "styled-components";

interface ColorFilterProps {
  readonly isActive: boolean;
}

const ColorFilter = styled.button<ColorFilterProps>`
  font-weight: ${(props) => (props.isActive ? "bold" : "normal")};
`;

export default ColorFilter;
