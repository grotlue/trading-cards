import styled from "styled-components";

interface ColorFilterModeProps {
  readonly isActive: boolean;
}

const ColorFilterMode = styled.button<ColorFilterModeProps>`
  font-weight: ${(props) => (props.isActive ? "bold" : "normal")};
`;

export default ColorFilterMode;
